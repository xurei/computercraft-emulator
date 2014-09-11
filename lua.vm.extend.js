(function(){
	Lua.eval = function(L, text) {
		var newL = jQuery.extend(true, {}, L);
		newL.execute(text);
		return newL;
	}
	
	//Lua.eval(L, "print(\"eval ok\")")
})()