(function ($)
{
	window.CCAPI = {};

	var CCAPI = window.CCAPI;
	CCAPI.null = null;
	CCAPI.peripherals = {};

	CCAPI.peripherals.term = null;
	CCAPI.peripherals.left = null;
	CCAPI.peripherals.right = null;
	CCAPI.peripherals.top = null;
	CCAPI.peripherals.bottom = null;
	CCAPI.peripherals.front = null;
	CCAPI.peripherals.back = null;
	
	CCAPI.peripheralTypes = {};
	//----------------------------------------------------------------------------
	
	CCAPI.colors = {
		1    : "#FFFFFF",
		2    : "#FFA500",
		4    : "#FF00FF",
		8    : "#ADD8E6",
		16   : "#FFFF00",
		32   : "#00FF00",
		64   : "#FFC0CB",
		128  : "#808080",
		256  : "#D3D3D3",
		512  : "#00FFFF",
		1024 : "#800080",
		2048 : "#0000FF",
		4096 : "#A52A2A",
		8192 : "#008000",
		16384: "#FF0000",
		32768: "#000000"
	};
	//----------------------------------------------------------------------------
	
	/**
	 * This method registers a new type of peripheral in the emulator 
	 */
	CCAPI.registerPeripheral = function (periph_name, full_name)	{
		var js = document.createElement("script");
		var tmpl = document.createElement("script");
		var css = document.createElement("link");
		
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		js.setAttribute("type", "text/javascript");
		tmpl.setAttribute("type", "text/x-jquery-tmpl");
		var lua_loaded = false; 
		var tmpl_loaded = false; 

		js.setAttribute("src", "peripherals/"+periph_name+"/"+periph_name+".js");
		css.setAttribute("href", "peripherals/"+periph_name+"/"+periph_name+".css");
		
		$.ajax({
			url: "peripherals/"+periph_name+"/"+periph_name+".tmpl",
			async: false,
			success: function(data) {
				tmpl.innerHTML = data;
				tmpl_loaded = true;
			}
		});
		
		$('.select-block-type').each(function(){
			var $option = $('<option value="'+periph_name+'">'+full_name+'</option>');
			$(this).append($option);
		});
		
		CCAPI.peripheralTypes[periph_name] = {
			"tmpl": tmpl
		};
		
		$("head").append(css);
		$("body").append(js);
	};
	//----------------------------------------------------------------------------
	
	CCAPI.buildPeripheral = function(name, $elem) {
		if (CCAPI.peripheralTypes[name] != undefined) {
			var tmpl = CCAPI.peripheralTypes[name].tmpl;
			var $elem = $.tmpl(tmpl);
			
			return new CCAPI.peripheralTypes[name].constructor($elem); 
		}
		else {
			console.error("No peripheral with this name : "+name);
			return null;
		}
	};
	//----------------------------------------------------------------------------
	
	CCAPI.call = function (side, method, args)
	{
		console.log(side+":"+method+"(");
		for (var i = 2; i < arguments.length; i++) {
	    console.log(arguments[i]+",");
	  }
		console.log(")");
	}
	
	//Register the base Peripheral
	{
		var js = document.createElement("script");
		js.setAttribute("type", "text/javascript");
		js.setAttribute("src", "peripherals/basePeripheral.js");
		$("body").append(js);
	}
	
})(jQuery);
