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
		if side == "left" then
			return peripheral.periphs["left"]
		elseif side == "right" then
			return peripheral.periphs["right"]
		elseif side == "top" then
			return peripheral.periphs["top"]
		elseif side == "bottom" then
			return peripheral.periphs["bottom"]
		elseif side == "front" then
			return peripheral.periphs["front"]
		elseif side == "back" then
			return peripheral.periphs["back"]
		end
	else
		return nil
	end
end
-- -----------------------------------------------------------------------------

function peripheral.getType(side)
	if peripheral.isPresent(side) then
		if side == "left" then
			return peripheral.periphs["left"]["_periph_name"]
		elseif side == "right" then
			return peripheral.periphs["right"]["_periph_name"]
		elseif side == "top" then
			return peripheral.periphs["top"]["_periph_name"]
		elseif side == "bottom" then
			return peripheral.periphs["bottom"]["_periph_name"]
		elseif side == "front" then
			return peripheral.periphs["front"]["_periph_name"]
		elseif side == "back" then
			return peripheral.periphs["back"]["_periph_name"]
		end
	else
		return nil
	end
end
-- -----------------------------------------------------------------------------

function peripheral.isPresent(side)
	if side == "left" then
		return peripheral.periphs["left"] ~= nil
	elseif side == "right" then
		return peripheral.periphs["right"] ~= nil
	elseif side == "top" then
		return peripheral.periphs["top"] ~= nil
	elseif side == "bottom" then
		return peripheral.periphs["bottom"] ~= nil
	elseif side == "front" then
		return peripheral.periphs["front"] ~= nil
	elseif side == "back" then
		return peripheral.periphs["back"] ~= nil
	end
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
