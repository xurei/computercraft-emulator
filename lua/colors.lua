colors = {}

colors.white     = 1
colors.orange    = 2
colors.magenta   = 4
colors.lightBlue = 8
colors.yellow    = 16
colors.lime      = 32
colors.pink      = 64
colors.gray      = 128
colors.lightGray = 256
colors.cyan      = 512
colors.purple    = 1024
colors.blue      = 2048
colors.brown     = 4096
colors.green     = 8192
colors.red       = 16384
colors.black     = 32768
-- -----------------------------------------------------------------------------

-- FIXME cannot use multiple arguments, got a syntax error. I'm using a lot of arguments instead 
function colors.combine(c1,c2,c3,c4,c5,c6,c7,c8,c9)
	return colors._combine({c1,c2,c3,c4,c5,c6,c7,c8,c9})
end

function colors._combine(colors)
	local c = 0
	local i = 1
	while (colors[i] ~= nil) do
		c = bit.bor(c, colors[i])
		i = i+1
	end
	return c
end
-- -----------------------------------------------------------------------------

function colors.test(c,sub_c)
	return bit.band(c, sub_c) == sub_c
end
-- -----------------------------------------------------------------------------

function colors.subtract(c1,c2,c3,c4,c5,c6,c7,c8,c9)
	return colors._subtract(c1,{c2,c3,c4,c5,c6,c7,c8,c9})
end

function colors._subtract(c1, cols)
	local c = c1
	local i = 1
	while (cols[i] ~= nil) do
		if colors.test(c,cols[i]) then
			print(c)
			c = bit.band(c, bit.bnot(cols[i]))
			print(c)
		end 
		i = i+1
	end
	return c
end
-- -----------------------------------------------------------------------------