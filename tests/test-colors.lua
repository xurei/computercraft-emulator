print("-- TESTING colors API")

local c = colors.combine(colors.red, colors.yellow)
if (c ~= 16400) then
	error("colors.combine() didn't return the expected value")
end

c = colors.combine(colors.red, colors.red)
if (c ~= colors.red) then
	error("colors.combine() didn't return the expected value")
end

c = colors.subtract(colors.red, colors.yellow)
if (c ~= colors.red) then
	error("colors.subtract() didn't return the expected value " .. colors.red)
end

c = colors.subtract(colors.red, colors.red)
if (c ~= 0) then
	error("colors.subtract() didn't return the expected value 0")
end


c = colors.test(7, 3)
if (c ~= true) then
	error("colors.test() didn't return the expected value true")
end

c = colors.test(7, 11)
if (c ~= false) then
	error("colors.test() didn't return the expected value false")
end

print("-------------------------------")