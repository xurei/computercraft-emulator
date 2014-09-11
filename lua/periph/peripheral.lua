peripheral = {}
peripheral.__factory = {}
peripheral.__factory.constructors = {}

function peripheral.wrap(side)
	local CCAPI = js.global.CCAPI 
	local object = peripheral._getObject(side)
	if (object == nil or object._periph_name == nil) then
		return nil
	end
	print("wrap " .. object._periph_name)
	
	return peripheral.__factory.create(object._periph_name, object)
end

function peripheral.call(side, method, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
	
end

function peripheral._getObject(side)
	if peripheral.isPresent(side) then
		local CCAPI = js.global.CCAPI 
		if side == "left" then
			return CCAPI.peripherals.left
		elseif side == "right" then
			return CCAPI.peripherals.right
		elseif side == "top" then
			return CCAPI.peripherals.top
		elseif side == "bottom" then
			return CCAPI.peripherals.bottom
		elseif side == "front" then
			return CCAPI.peripherals.front
		elseif side == "back" then
			return CCAPI.peripherals.back
		end
	else
		return nil
	end
end

function peripheral.getType(side)
	if peripheral.isPresent(side) then
		local CCAPI = js.global.CCAPI 
		if side == "left" then
			return CCAPI.peripherals.left
		elseif side == "right" then
			return CCAPI.peripherals.right
		elseif side == "top" then
			return CCAPI.peripherals.top
		elseif side == "bottom" then
			return CCAPI.peripherals.bottom
		elseif side == "front" then
			return CCAPI.peripherals.front
		elseif side == "back" then
			return CCAPI.peripherals.back
		end
	else
		return nil
	end
end

function peripheral.isPresent(side)
	local CCAPI = js.global.CCAPI 
	if side == "left" then
		return CCAPI.peripherals.left ~= CCAPI.null
	elseif side == "right" then
		return CCAPI.peripherals.right ~= CCAPI.null
	elseif side == "top" then
		return CCAPI.peripherals.top ~= CCAPI.null
	elseif side == "bottom" then
		return CCAPI.peripherals.bottom ~= CCAPI.null
	elseif side == "front" then
		return CCAPI.peripherals.front ~= CCAPI.null
	elseif side == "back" then
		return CCAPI.peripherals.back ~= CCAPI.null
	end
end

function peripheral.__factory.create(name, el)
	for n, constructor in pairs(peripheral.__factory.constructors) do
		if n == name then
			return constructor(el)
		end
	end
end

function peripheral.__factory.register(name, constructor)
	peripheral.__factory.constructors[name] = constructor
end