rs = {}
redstone = rs

function redstone.getSides() -- Returns a table of possible sides.
	return {"bottom","top","back","front","right","left"}
end
--------------------------------------------------------------------------------

function redstone.getInput(side) -- Returns the current redstone input signal state on side.
	if peripheral.getType(side) == "redstone" then
		return peripheral.call(side, "getInput")
	else
		return false
	end
end
--------------------------------------------------------------------------------

function redstone.getAnalogInput(side) -- (Requires CC1.51 and above) Returns the current redstone input signal strength on side. If no input is present, returns 0. If a redstone source (such as a redstone torch or block) is directly adjacent to the computer, returns 15.
	if peripheral.getType(side) == "redstone" then
		return peripheral.call(side, "getAnalogInput")
	else
		return 0
	end
end
--------------------------------------------------------------------------------

function redstone.getOutput(side) -- Returns the current redstone output signal on side.
	if peripheral.getType(side) == "redstone" then
		return peripheral.call(side, "getOutput")
	else
		return 0
	end
end
--------------------------------------------------------------------------------

function redstone.getAnalogOutput(side) -- (Requires CC1.51 and above) Returns the current redstone output signal strength on side.
	if peripheral.getType(side) == "redstone" then
		return peripheral.call(side, "getAnalogOutput")
	else
		return 0
	end
end
--------------------------------------------------------------------------------

function redstone.setOutput(side, value) -- Sets or resets a redstone signal on side.
	if peripheral.getType(side) == "redstone" then
		peripheral.callAsync(side, "setOutput", value)
	end
end
--------------------------------------------------------------------------------

function redstone.setAnalogOutput(side, strength) -- (Requires CC1.51 and above) Sets or resets a redstone signal on side to strength (where strength is a positive integer).
	if peripheral.getType(side) == "redstone" then
		peripheral.callAsync(side, "setAnalogOutput", strength)
	end
end
--------------------------------------------------------------------------------

-- function redstone.getBundledInput(side) -- Returns the state (as a number) of a RedPower bundled / Minefactory Reloaded RedNet cable connected to side.
-- end
--------------------------------------------------------------------------------

-- function redstone.getBundledOutput(side) -- Returns the set of RedPower wires in the RedPower bundled / Minefactory Reloaded RedNet cable which are being activated by the terminal on side.
-- end
--------------------------------------------------------------------------------

-- function redstone.setBundledOutput(side, colors) -- Sets one or multiple colored signals in a RedPower bundled / Minefactory Reloaded RedNet cable attached to side. colors will determine which signals are activated. In order to set multiple signals, add the color values of the colors you want to activate. To turn off all of the colors, use 0.
-- end
--------------------------------------------------------------------------------

-- function redstone.testBundledInput(side, color) -- Returns true if color is active in a RedPower bundled / Minefactory Reloaded RedNet cable attached to side. Else, returns false.
-- end
--------------------------------------------------------------------------------