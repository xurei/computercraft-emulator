importScripts("lua5.1.5.js"/*, "lua.vm.extend.js"*/);
//------------------------------------------------------------------------------

var global = this;
var call_return = null;
global.CCAPI = {};
global.running = false;

var C = Lua5_1.C;
var L = C.lua_open();
C.luaL_openlibs(L);
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
	xhr.open("GET", src, false);
	xhr.send();
	//L.execute(xhr.responseText);
	if (C.luaL_dostring(L, xhr.responseText) != 0)
	{
	  var err = C.lua_tostring(L, -1);
	  C.lua_close(L);
	  L = 0;
	  throw new Error("Lua error in " + src + " : " + err);
	}
	/*else
	{
		console.debug(src+ "loaded");
	}*/
}
load_lua('../lua/math.lua')
load_lua('../lua/bit.lua')
load_lua('../lua/sleep.lua')
load_lua('../lua/colors.lua')
load_lua('../lua/util.lua	')
load_lua('../lua/tabletojson.lua')
load_lua('../lua/peripheral.lua')
//------------------------------------------------------------------------------

function execute(code) {
	if (C.luaL_dostring(L, code) != 0)
	{
	  var err = C.lua_tostring(L, -1);
	  C.lua_close(L);
	  L = 0;
	  throw new Error("Lua error : " + err);
	}
}
//------------------------------------------------------------------------------

C.lua_pushcfunction(
	L,
	Lua5_1.Runtime.addFunction(function(L)
	{
		var args = [];
		var str;
		var i = 1;
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

		global.postMessage( {type:"PRINT", data:out} );
		return 0;
	})
);
C.lua_setglobal(L, "_print");
//------------------------------------------------------------------------------

//Message sending function
C.lua_pushcfunction(
	L,
	Lua5_1.Runtime.addFunction(function(L)
	{
		var json = C.luaL_checklstring(L, 1);
		var obj = JSON.parse(json);
		//console.log("SEND MESSAGE");
		
		global.postMessage(obj);
		
		return 0;
	})
);
C.lua_setglobal(L, "SEND_MESSAGE");
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
	code += "if event ~= nil then \n SEND_MESSAGE(tabletojson(event)) end";
	execute(code);
};
//------------------------------------------------------------------------------

addEventListener("message", function(e) {
	switch (e.data.type)
	{
		case 'START': {
			global.running = true;
			
			//Pushing the peripherals' signature into the Lua VM
			execute("peripheral.periphs = "+jsontotable(e.data.peripherals));
			
			//Defining the code as a coroutine
			var code = "main_routine = coroutine.create(function ()\n" + e.data.code + "\n SEND_MESSAGE(\"{\\\"type\\\":\\\"END\\\"}\")\nend)";
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
