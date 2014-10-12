(function (CCAPI)
{
	CCAPI.redstone = function ($elem) {
		var out = {};
		out.elem = $elem;
		
		return out;
	};
	
	CCAPI.peripheralTypes["template"].constructor = CCAPI.Template;
})(window.CCAPI);