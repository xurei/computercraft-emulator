BigReactorPort = {}

function BigReactorPort.new (o)
	print("Big reactor")
	
	local CCAPI = js.global.CCAPI
	
	local out = {}
	
	local getters = {
		'getActive',
		'getConnected',
		'isActivelyCooled',
		'getNumberOfControlRods',
		'getEnergyStored',
		'getFuelTemperature',
		'getCasingTemperature',
		'getFuelAmount',
		'getWasteAmount',
		'getFuelAmountMax',
		'getEnergyProducedLastTick', 
		'getHotFluidProducedLastTick',
		'getCoolantType',
		'getCoolantAmount',
		'getHotFluidType',
		'getHotFluidAmount',
		'getFuelReactivity',
		'getFuelConsumedLastTick'
	}
	
	for i,v in ipairs(getters) do
		out[v] = function()
			local fn = o[v]
			return fn()
		end
	end
	
	return out
end

peripheral.__factory.register("bigreactors-computer-port", BigReactorPort.new) 