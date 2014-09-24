Monitor = {}

function Monitor.new (o)
	-- for key,value in pairs(o) do
	-- 	print(key)
	-- end
	-- 
	-- return js.global.CCAPI.Monitor:new(o)
	local out = {}
	out.x = 1
	out.y = 1
	out.clear = function()
		o:clear()
	end
	out.clearLine = function()
		o:clearLine()
	end
	out.getCursorPos = function()
		return out.x,out.y
	end 
	out.isColor = function()
		return false
	end 
	out.getSize = function()
		return o:getWidth(), o:getHeight()
	end 
	out.scroll = function(n)
		o:scroll(n)
	end
	out.setBackgroundColor = function (c)
		o:setBackgroundColor(c)
	end
	out.setCursorBlink = function(b)
		o:setCursorBlink(b)
	end 
	out.setCursorPos = function(x,y)
		out.x = x
		out.y = y
		o:setCursorPos(x,y)
	end
	out.setTextColor = function(i)
		o:setTextColor(i)
	end
	out.setTextScale = function(i)
		out.clear()
		o:setTextScale(i)
	end
	out.write = function(text)
		o:write(text)
	end
	
	return out
end

peripheral.__factory.register("monitor", Monitor.new)