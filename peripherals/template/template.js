(function (CCAPI)
{
	CCAPI.${template} = function ($elem) {
		var out = {};
		out.elem = $elem;
		
		return out;
	};
	
	CCAPI.peripheralTypes["${template}"].constructor = CCAPI.${template};
})(window.CCAPI);