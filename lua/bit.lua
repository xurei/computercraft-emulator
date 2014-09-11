bit = {}

function bit.blshift(n, bits)  -- Shifts a number left by a specified number of bits.
	return bit32.lshift(n, bits)
end

function bit.brshift(n, bits) 	-- Shifts a number right arithmetically by a specified number of bits.
	local out = bit32.rshift(n, bits)
	
	if (n >= 2147483648) then
		out = bit.bor(out, bit.blshift(bit.blogic_rshift(4294967295, 32 - bits), 32 - bits))
	end
	
	return out
end

function bit.blogic_rshift(n, bits) 	-- Shifts a number right arithmetically by a specified number of bits.
	return bit32.rshift(n, bits)
end

function bit.bxor(m, n) 	-- Computes the bitwise exclusive OR of two numbers.
	return bit32.bxor(n)
end

function bit.bor(m, n) 	-- Computes the bitwise inclusive OR of two numbers.
	return bit32.bor(m, n)
end

function bit.band(m, n) 	-- Computes the bitwise AND of two numbers.
	return bit32.band(m, n)
end

function bit.bnot(n) 	-- Computes the bitwise NOT of a number. 
	return bit32.bnot(n)
end

local function check_int(n)
 -- checking not float
 if(n - math.floor(n) > 0) then
  error("trying to use bitwise operation on non-integer!")
 end
end

function bit.tobits(n)
 check_int(n)
 if(n < 0) then
  -- negative
  return bit.tobits(bit.bnot(math.abs(n)) + 1)
 end
 -- to bits table
 local tbl = {}
 local cnt = 1
 while (n > 0) do
  local last = math.mod(n,2)
  if(last == 1) then
   tbl[cnt] = 1
  else
   tbl[cnt] = 0
  end
  n = (n-last)/2
  cnt = cnt + 1
 end

 return tbl
end

function bit.tonum(tbl)
 local n = table.maxn(tbl)

 local rslt = 0
 local power = 1
 for i = 1, n do
  rslt = rslt + tbl[i]*power
  power = power*2
 end
 
 return rslt
end