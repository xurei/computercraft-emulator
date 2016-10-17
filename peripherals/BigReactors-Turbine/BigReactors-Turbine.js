(function (CCAPI)
{
	/*
	 getConnected	None	Boolean	Returns true if the computer port is connected to a valid Multiblock Turbine.
	 getActive	None	Boolean	Returns true if the turbine is active (consuming hot fluid and generating power), false otherwise.
	 getEnergyStored	None	Integer	Returns the amount of energy stored in the Multiblock Turbine's internal energy buffer, in Redstone Flux (RF) units
	 getRotorSpeed	None	Float	Returns the rotational velocity of the Multiblock Turbine's rotor, in Rotations Per Minute (RPMs)
	 getInputAmount	None	Integer	Returns the amount of fluid contained in the Multiblock Turbine's hot-fluid intake tank, in milli-buckets (mB)
	 getInputType	None	String or Nil	Returns the Fluid Dictionary name of the fluid contained in the Multiblock Turbine's hot-fluid intake tank, or Nil if the tank is empty
	 getOutputAmount	None	Integer	Returns the amount of fluid contained in the Multiblock Turbine's effluent outlet tank, in milli-buckets (mB)
	 getOutputType	None	String or Nil	Returns the Fluid Dictionary name of the fluid contained in the Multiblock Turbine's effluent outlet tank, or Nil if the tank is empty
	 getFluidAmountMax	None	Integer	Returns the maximum amount of fluid which the Turbine's fluid tanks may contain, in milli-buckets (mB)
	 getFluidFlowRate	None	Integer	Returns the amount of hot fluid which the turbine consumed in the last tick, in milli-buckets (mB)
	 getFluidFlowRateMax	None	Integer	Returns the user setting governing the maximum desired amount of fluid for the Multiblock Turbine to consume per tick, in milli-buckets (mB)
	 getFluidFlowRateMaxMax	None	Integer	Returns the maximum permissible user setting for the desired fluid flow rate, in milli-buckets (mB). Normally returns 2000 mB
	 getEnergyProducedLastTick	None	Float	Returns the amount of energy the Multiblock Turbine produced in the last tick, in Redstone Flux (RF) units
	 getInductorEngaged	None	Boolean	Returns true if the Multiblock Turbine's induction coils are engaged, false otherwise.
	 setActive	Boolean: active?	None	Sets the reactor to be active if the argument is true, or inactive if the argument is false
	 setFluidFlowRateMax	Integer: flow rate (0 through FluidFlowRateMaxMax)	None	Sets the player's desired maximum rate at which the Multiblock Turbine will consume intake fluids. Range is from 0 (not inserted) to the return value of getFluidFlowRateMaxMax (normally 2000).
	 setVentOff	None	None	Sets the Multiblock Turbine to never vent its condensed/cooled fluids. This is identical to pressing the "Vent: None" button in the turbine's GUI.
	 setVentOverflow	None	None	Sets the Multiblock Turbine to vent its condensed/cooled fluids if they cannot be placed in the condensed fluid (outlet) tank. This is identical to pressing the "Vent: Overflow" button in the turbine's GUI.
	 setVentAll	None	None	Sets the Multiblock Turbine to always vent its condensed/cooled fluids, so the turbine will never create condensed fluid when processing hot fluids. This is identical to pressing the "Vent: All" button in the turbine's GUI.
	 setInductorEngaged	Boolean: engaged?	None	Activates or deactivates the Multiblock Turbine's induction coils. When inactive, power will not be generated and less energy will be removed from the turbine's rotor.
	 */
	
	CCAPI.bigreactorsTurbineComputerPort = function ($elem) {
		var out = CCAPI.basePeripheral($elem);
		
		out._addOnOffGetter("getConnected", '.is-connected');
		out._addOnOffGetter("getActive", '.is-active');
		//--------------------------------------------------------------------------
		
		out._addNumGetter('getEnergyStored', '[name="energy-stored"]');
		out._addNumGetter('getRotorSpeed', '[name="rotor-speed"]');
		out._addNumGetter('getInputAmount', '[name="input-amount"]');
		out._addNumGetter('getInputType', '[name="input-type"]');
		out._addNumGetter('getOutputAmount', '[name="output-amount"]');
		out._addNumGetter('getOutputType', '[name="output-type"]');
		out._addNumGetter('getFluidAmountMax', '[name="fluid-amount-max"]');
		out._addNumGetter('getFluidFlowRate', '[name="flow-rate"]');
		out._addNumGetter('getFluidFlowRateMax', '[name="flow-rate-max"]');
		out._addNumGetter('getFluidFlowRateMaxMax', '[name="flow-rate-max-max"]');
		out._addNumGetter('getEnergyProducedLastTick', '[name="energy-produced-last-tick"]');
		out._addNumGetter('getInductorEngaged', '[name="inductor-engaged"]');
		//--------------------------------------------------------------------------
		
		out.setActive = function (b) {
			if (b=="true")
				$elem.find('.is-active').addClass('active');
			else
				$elem.find('.is-active').removeClass('active');
		};
		//--------------------------------------------------------------------------
		
		out.setInductorEngaged = function (b) {
			if (b=="true")
				$elem.find('.inductor-engaged').addClass('active');
			else
				$elem.find('.inductor-engaged').removeClass('active');
		};
		//--------------------------------------------------------------------------
		
		out.setFluidFlowRateMax = function (rate) {
			$elem.find('[name="flow-rate-max"]').val(rate);
		};
		//--------------------------------------------------------------------------
		
		out.setVentOff = function () {
		};
		//--------------------------------------------------------------------------
		
		out.setVentOverflow = function () {
		};
		//--------------------------------------------------------------------------
		
		out.setVentAll = function () {
		};
		//--------------------------------------------------------------------------
		
		return out;
	};
	
	CCAPI.peripheralTypes["BigReactors-Turbine"].constructor = CCAPI.bigreactorsTurbineComputerPort;
})(window.CCAPI);