(function ()
{
	var CCAPI = window.CCAPI;
	CCAPI.BigReactorPort = function ($elem) {
		var out = {};
		out.elem = $elem;
		
		var get_on_off_bindings = {
			'getConnected': $elem.find('.is-connected'),
			'getActive': $elem.find('.is-active'),
			'isActivelyCooled': $elem.find('.is-actively-cooled')
		};
		for (var fn_name in get_on_off_bindings)
		{
			(function(get_on_off_bindings, fn_name){
				out[fn_name] = function() { 
					return [get_on_off_bindings[fn_name].hasClass('active')];
				}
			})(get_on_off_bindings, fn_name);
		}
		//--------------------------------------------------------------------------

		var get_bindings = {
			'getNumberOfControlRods': $elem.find('[name="nb-control-rods"]'),
			'getEnergyStored': $elem.find('[name="energy"]'),
			'getFuelTemperature': $elem.find('[name="fuel-temp"]'), 
			'getCasingTemperature': $elem.find('[name="casing-temp"]'), 
			'getFuelAmount': $elem.find('[name="fuel-amount"]'), 
			'getWasteAmount': $elem.find('[name="waste-amount"]'), 
			'getFuelAmountMax': $elem.find('[name="fuel-amount-max"]'), 
			'getEnergyProducedLastTick': $elem.find('[name="energy-production"]'), 
			'getHotFluidProducedLastTick': $elem.find('[name="hot-fluid-production"]'), 
			'getCoolantType': $elem.find('[name="coolant-type"]'), 
			'getCoolantAmount': $elem.find('[name="coolant-amount"]'), 
			'getHotFluidType': $elem.find('[name="hot-fluid-type"]'), 
			'getHotFluidAmount': $elem.find('[name="hot-fluid-amount"]'), 
			'getFuelReactivity': $elem.find('[name="fuel-reactivity"]'), 
			'getFuelConsumedLastTick': $elem.find('[name="fuel-consumption"]')
		};
		for (fn_name in get_bindings)
		{
			(function(get_on_off_bindings, fn_name){
				out[fn_name] = function() { 
					return [parseInt(get_bindings[fn_name].val())];
				}
			})(get_bindings, fn_name);
		}
		//--------------------------------------------------------------------------
		
		out.getControlRodName = function (i) {
			console.log("getControlRodName() Not supported yet");
		};
		//--------------------------------------------------------------------------
		
		out.getControlRodLevel = function (i) {
			console.log("getControlRodLevel() Not supported yet");
		};
		//-------------------------------------------------------------------------- 
		 
		out.setActive = function (b) {
			if (b=="true")
				$elem.find('.is-active').addClass('active');
			else
				$elem.find('.is-active').removeClass('active');
		};
		//-------------------------------------------------------------------------- 
		 
		out.setAllControlRodLevels = function () {
			console.log("setAllControlRodLevels() Not supported yet");
		};
		//-------------------------------------------------------------------------- 
		 
		out.setControlRodLevel = function () {
			console.log("setControlRodLevel() Not supported yet");
		};
		//-------------------------------------------------------------------------- 
		
		out.doEjectWaste = function () {
			$elem.find('[name="waste-amount"]').val(0);
		};
		//-------------------------------------------------------------------------- 
		
		return out;
	};
	
	CCAPI.peripheralTypes["bigreactors-computer-port"].constructor = CCAPI.BigReactorPort;
})();
