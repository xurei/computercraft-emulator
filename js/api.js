(function ($)
{
	window.CCAPI = [];

	var CCAPI = window.CCAPI;
	CCAPI.null = null;
	CCAPI.peripherals = [];

	CCAPI.peripherals.left = null;
	CCAPI.peripherals.right = "monitor";
	CCAPI.peripherals.top = null;
	CCAPI.peripherals.bottom = null;
	CCAPI.peripherals.front = null;
	CCAPI.peripherals.back = null;
	
	CCAPI.peripheralTypes = [];
	//----------------------------------------------------------------------------
	
	/**
	 * This method registers a new type of peripheral in the emulator 
	 */
	CCAPI.registerPeripheral = function (periph_name, full_name)	{
		var js = document.createElement("script")
		var tmpl = document.createElement("script")
		
		js.setAttribute("type", "text/javascript")
		tmpl.setAttribute("type", "text/x-jquery-tmpl")
		var lua_loaded = false; 
		var tmpl_loaded = false; 

		setTimeout(function(){
			js.setAttribute("src", "peripherals/"+periph_name+"/"+periph_name+".js");
		}, 100);
		$.ajax({
			url: "peripherals/"+periph_name+"/"+periph_name+".lua",
			success: function(data) {
				lua_loaded = true;
				L = Lua.eval(L, data)
			}
		});
		$.ajax({
			url: "peripherals/"+periph_name+"/"+periph_name+".tmpl",
			success: function(data) {
				tmpl.innerHTML = data;
				tmpl_loaded = true;
			}
		});
		/*var wait = function() {
			if (tmpl_loaded && lua_loaded) {
				
			}
		}*/
		
		$('.select-block-type').each(function(){
			var $option = $('<option value="'+periph_name+'">'+full_name+'</option>');
			$(this).append($option);
		});
		
		CCAPI.peripheralTypes[periph_name] = {
			"tmpl": tmpl
		};
		
		$("body").append(js);
		$("body").append(tmpl);
	};
	//----------------------------------------------------------------------------
	
	CCAPI.buildPeripheral = function(name, $elem) {
		if (CCAPI.peripheralTypes[name] != undefined) {
			var tmpl = CCAPI.peripheralTypes[name].tmpl;
			var $elem = $.tmpl(tmpl);
			
			return new CCAPI.peripheralTypes[name].constructor($elem); 
		}
		else
			console.error("No peripheral with this name : "+name);
	};
	//----------------------------------------------------------------------------
	
})(jQuery);