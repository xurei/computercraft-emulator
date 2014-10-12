(function (CCAPI)
{
	CCAPI.BigReactorPort = function ($elem) {
		var out = CCAPI.basePeripheral($elem);

		out._addOnOffGetter("getConnected", '.is-connected');
		out._addOnOffGetter("getActive", '.is-connected');
		out._addOnOffGetter("isActivelyCooled", '.is-connected');
		//--------------------------------------------------------------------------

		out._addNumGetter('getNumberOfControlRods', '[name="nb-control-rods"]');
		out._addNumGetter('getEnergyStored', '[name="energy"]');
		out._addNumGetter('getFuelTemperature', '[name="fuel-temp"]'); 
		out._addNumGetter('getCasingTemperature', '[name="casing-temp"]');
		out._addNumGetter('getFuelAmount', '[name="fuel-amount"]');
		out._addNumGetter('getWasteAmount', '[name="waste-amount"]'); 
		out._addNumGetter('getFuelAmountMax', '[name="fuel-amount-max"]'); 
		out._addNumGetter('getEnergyProducedLastTick', '[name="energy-production"]'); 
		out._addNumGetter('getHotFluidProducedLastTick', '[name="hot-fluid-production"]'); 
		out._addNumGetter('getCoolantType', '[name="coolant-type"]');
		out._addNumGetter('getCoolantAmount', '[name="coolant-amount"]'); 
		out._addNumGetter('getHotFluidType', '[name="hot-fluid-type"]');
		out._addNumGetter('getHotFluidAmount', '[name="hot-fluid-amount"]'); 
		out._addNumGetter('getFuelReactivity', '[name="fuel-reactivity"]');
		out._addNumGetter('getFuelConsumedLastTick', '[name="fuel-consumption"]');
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
})(window.CCAPI);
