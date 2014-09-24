function prh(o)
	for key,value in pairs(o) do
		_print("found member " .. key .. " type:" .. type(value));
	end
end

function print(str)
	local trace = debug.traceback()
	local k = 0
	for i in string.gmatch(trace, "[^\n]+") do
		k = k+1
		if k==3 then
			local l = 0
			for j in string.gmatch(i, "[^:]+") do
				l = l+1
				if l==2 then
					line = tonumber(j)
		  		_print("Line " .. tostring(line-1) .. " : (" .. type(str) .. ")" .. tostring(str))
		  		break
		  	end
		  end
		  break
	  end
	end
end