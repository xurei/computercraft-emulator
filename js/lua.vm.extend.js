(function(){
	Lua.eval = function(L, text) {
		var newL = extend({}, L); //Does not seem to work...
		newL.execute(text);
		return newL;
	}
	
	Lua.eval(L, "print(\"eval ok\")");
	Lua.eval(L, "i = 23"); 
	Lua.eval(L, "print(i)"); //This should throw an error, however nothing happens
})();

console.log('lua.vm.extend loaded');