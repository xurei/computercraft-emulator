print("-- TESTING bit API")

local bits = 2

local v = bit.blshift(bit.blogic_rshift(4294967295, 32 - bits), 32 - bits)
if (v ~= 3221225472) then
	error("blshift didn't return the expected value")
end
local bits = bit.tobits(v)

-- for i=0,31 do 
--	io.write(bits[32-i])
-- end

v = bit.brshift(2147483648, 2)
if (v ~= 3758096384) then
	error("brshift didn't return the expected value")
end

print("-------------------------------")