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

function peripheral.call(side, method, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
	
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
		return peripheral.periphs[side]["_periph_name"]
	else
		return nil
	end
end
-- -----------------------------------------------------------------------------

function peripheral.isPresent(side)
	return peripheral.periphs[side] ~= nil
end
-- -----------------------------------------------------------------------------

function peripheral.__factory.create(side, object)
	local out = {}
	for _i,key in pairs(object.methods) do
		if (key == "write" or key == "setCursorPos" or key == "setBackgroundColor") then
			out[key] = function(...)
				SEND_MESSAGE(tabletojson({type="CALLASYNC", side=side, method=key, args=arg }))
			end
		else
			out[key] = function(...)
				-- pausing the coroutine and sending the event as parameters - The returned value will be the output of the method
				return coroutine.yield({type="CALL", side=side, method=key, args=arg })
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
