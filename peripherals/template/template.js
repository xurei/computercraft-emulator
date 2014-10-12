(function (CCAPI)
{
	CCAPI.${template} = function ($elem) {
		var out = CCAPI.basePeripheral($elem);
		
		return out;
	};
	
	CCAPI.peripheralTypes["${template}"].constructor = CCAPI.${template};
})(window.CCAPI);