function tabletojson(table)
	if type(table) ~= "table" then
		print(debug.traceback())
		if type(table) == "string" then
			print("string: " .. table)
		end
		error("tabletojson() - table expected, got "..type(table).."\n"..tostring(table), 2)
	end
	local out = "{"
	local sep = ""
	for key,value in pairs(table) do
		out = out .. sep .. "\"" .. key .. "\":"
	
		if type(value) == "table" then
			local c = tabletojson(value)
			out = out .. c 
		elseif type(value) == "boolean" then
			if (value) then
				out = out .. "\"true\""
			else	
				out = out .. "\"false\""
			end
		else
			out = out .. "\"" .. value .. "\""
		end
	
		sep = ","
	end
	
	return out .. "}"
end