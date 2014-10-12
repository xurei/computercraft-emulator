peripheral = {}
peripheral.__factory = {}
peripheral.__factory.constructors = {}
-- -----------------------------------------------------------------------------

function peripheral.wrap(side)
	local object = peripheral._getObject(side)
	if (object == nil or object.type == nil) then
		return nil
	end
	
	return peripheral.__factory.create(side, object)
end
-- -----------------------------------------------------------------------------

function peripheral.callAsync(side, key, ...)
	return peripheral._callAsync(side, key, arg)
end
-- -----------------------------------------------------------------------------

function peripheral._callAsync(side, key, args)
	local event = '{"type":"CALLASYNC","side":"'..side..'","method":"'..key..'","args":'..tabletojson(args)..'}'
	SEND_MESSAGE(event)
end
-- -----------------------------------------------------------------------------

function peripheral.call(side, key, ...)
	return peripheral._call(side, key, arg)
end
-- -----------------------------------------------------------------------------

function peripheral._call(side, key, args)
	local event = '{"type":"CALL","side":"'..side..'","method":"'..key..'","args":'..tabletojson(args)..'}'
	return coroutine.yield(event)
end
-- -----------------------------------------------------------------------------

function peripheral._getObject(side)
	if peripheral.isPresent(side) then
		return peripheral.periphs[side]
	else
		return nil
	end
end
-- -----------------------------------------------------------------------------

function peripheral.getType(side)
	if peripheral.isPresent(side) then
		return peripheral.periphs[side]["type"]
	else
		return nil
	end
end
-- -----------------------------------------------------------------------------

function peripheral.isPresent(side)
	return (peripheral.periphs[side] ~= nil)
end
-- -----------------------------------------------------------------------------

function peripheral.__factory.create(side, object)
	local out = {}
	for _i,key in pairs(object.methods) do
		if (key == "write" or key == "setCursorPos" or key == "setBackgroundColor") then
			out[key] = function(...)
				return peripheral._callAsync(side, key, arg)
			end
		else
			out[key] = function(...)
				-- pausing the coroutine and sending the event as parameters - The returned value will be the output of the method
				return peripheral._call(side, key, arg)
			end
		end
	end
	
	return out
end
-- -----------------------------------------------------------------------------

function peripheral.__factory.register(name, constructor)
	peripheral.__factory.constructors[name] = constructor
end
-- -----------------------------------------------------------------------------
