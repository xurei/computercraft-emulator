importScripts("lua5.1.5.js"/*, "lua.vm.extend.js"*/);
//------------------------------------------------------------------------------

var global = this;
var call_return = null;
global.CCAPI = {};
global.ready = false;
global.running = false;

var C = null;
var L = null;
//------------------------------------------------------------------------------

function isInt(n) {
  return n % 1 === 0;
}
//------------------------------------------------------------------------------

function jsontotable(json)
{
	if (json === null || json === undefined) {
		return "nil"
	}
	else if (typeof(json) == "object")
	{
		var out = "{";
		var sep = "";
		for (i in json) {
			var v = json[i];
			if (isInt(i))
				out += sep+jsontotable(v);
			else
				out += sep + i + '=' + jsontotable(v);
			sep = ", ";
		}
		return out + '}';
	}
	else if (typeof(json) == "array")
	{
		var out = "{";
		var sep = "";
		for (i in json) {
			var v = json[i];
			out += sep+jsontotable(v);
			sep = ", ";
		}
		return out + '}';
	}
	else
	{
		return '"'+json+'"';
	}
	
}
//------------------------------------------------------------------------------

function load_lua(src) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", src+"?_t="+Math.random(), false);
	xhr.send();
	if (C.luaL_dostring(L, xhr.responseText) != 0)
	{
	  var err = C.lua_tostring(L, -1);
	  C.lua_close(L);
	  L = 0;
		global.ready = false;
	  throw new Error("Lua error in " + src + " : " + err);
	}
	/*else
	{
		console.debug(src+ "loaded");
	}*/
}
//------------------------------------------------------------------------------

function init()
{
	console.log('INIT');
	C = Lua5_1.C;
	L = C.lua_open();
	C.luaL_openlibs(L);
	
	load_lua('../lua/math.lua');
	load_lua('../lua/bit.lua');
	load_lua('../lua/sleep.lua');
	load_lua('../lua/colors.lua');
	load_lua('../lua/util.lua');
	load_lua('../lua/read.lua');
	load_lua('../lua/tabletojson.lua');
	load_lua('../lua/peripheral.lua');
	load_lua('../lua/redstone.lua');
	//----------------------------------------------------------------------------

	C.lua_pushcfunction(
		L,
		Lua5_1.Runtime.addFunction(function(L)
		{
			var args = [];
			var prefix = C.lua_tostring(L, 1);
			var i = 2;
			var str;
			while ((str = C.lua_tostring(L, i)) != "") {
				args.push(str);
				i++;
			}
			var out = "";
			var sep = "";
			for (i in args){
				out += sep + args[i];
				sep = "\t"; 
			}

			global.postMessage( {type:"PRINT", prefix:prefix, data:out} );
			return 0;
		})
	);
	C.lua_setglobal(L, "_print");
	//----------------------------------------------------------------------------

	//Message sending function
	C.lua_pushcfunction(
		L,
		Lua5_1.Runtime.addFunction(function(L)
		{
			var json = C.luaL_checklstring(L, 1);
			var obj = JSON.parse(json);
			
			global.postMessage(obj);
			
			return 0;
		})
	);
	C.lua_setglobal(L, "SEND_MESSAGE");
	//----------------------------------------------------------------------------
	
	global.ready = true;
}
//------------------------------------------------------------------------------

function execute(code) {
	if (!global.ready)
		init();
	if (C.luaL_dostring(L, code) != 0)
	{
		//Error handling
		  var errmsg = C.lua_tostring(L, -1);
		  C.lua_close(L);
		  L = 0;
			global.ready = false;
			global.running = false;
			
			if (errmsg.substring(0,23) == '[string "main_routine =')
			{
				global.postMessage({type:"ERROR",message:errmsg});
			}

			global.postMessage({type:"END"});
			
		 throw new Error("Lua error : " + errmsg);
	}
}
//------------------------------------------------------------------------------

global.CCAPI.resume = function(values) { 
	//TODO different way to give values their type
	
	var code = "local _, event = coroutine.resume(main_routine"
	for (i in values)
	{
		var val = values[i];
		if (typeof(val)=="boolean" || typeof(val)=="number")
			code += ", "+values[i];
		else			
			code += ", \""+values[i]+"\"";
	}
	code += ")\n";
	code += 
		"if event ~= nil then \n" +
		"	if coroutine.status(main_routine) == \"dead\" then \n" +
		"		SEND_MESSAGE('{\"type\":\"ERROR\",\"message\":\"'..string.gsub(event,'\"','\\\\\"')..'\"}')\n" +
		"		SEND_MESSAGE('{\"type\":\"END\"}')\n" +
		"	else\n" +
		"		SEND_MESSAGE(event)\n" +
		"	end\n" +
		"end";
	execute(code);
};
//------------------------------------------------------------------------------

addEventListener("message", function(e) {
	switch (e.data.type)
	{
		case 'START': {
			global.running = true;
			console.log('START');

			//Pushing the peripherals' signature into the Lua VM
			execute("peripheral.periphs = "+jsontotable(e.data.peripherals));
			
			//Bindind term to a monitor
			execute("term = peripheral.wrap('term')");
			
			//Defining the code as a coroutine
			var code = "main_routine = coroutine.create(function ()\n" + e.data.code + "\n SEND_MESSAGE('{\"type\":\"END\"}')\nend)";
			execute(code);

			//Running the code
			global.CCAPI.resume([]);
			
			break;
		}
		
		case 'CALL_RETURN':{
			if (global.running) {
				global.CCAPI.resume(e.data.value);
			}
			break;
		}
		
		case 'STOP':{
			global.running = false;
			break;
		}
	}
});
//------------------------------------------------------------------------------

console.log("Lua Worker Running");
