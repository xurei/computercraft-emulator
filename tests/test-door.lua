-- Keypad system by Nemesismax
-- Ver. 1.5


term.clear()
term.setCursorPos(1,1)

local sound = false -- toggle sound (noteblock detected on initilization)
local m -- monitor
local n -- noteblock

local data = {
outputSide = "right" ,
invert = false , -- Whether to invert the redstone output 
openTime = 5 , -- Time (in seconds) to keep the door open
gridColor = colors.gray , -- Color of the grid (Set to same as bgColor for 'no' grid)
gridBgColor = colors.black , -- bg color of the grid. (usually same color as bgColor)
numColor = colors.lightBlue , -- Color of Keys
bgColor = colors.black , -- Background Color
yVal = 1 , --optionally set the vertical position of the keypad
censor = true --censor the pad input
}



local disp = {}
local obj = {}
local curInput = {}

-- checking functionlist

local mainLoop
local renderKeys 
local getInput 
local logInput
local compareInput 
local grantAccess 
local denyAccess
local door

-- SHA256 API

local sha256
local digestblock
local initH256 
local preproc
local s232num
local num2s
local str2hexa
local rrotate
local lshift
local rshift
local rshift1
local bnot
local band
local bxor
local make_bitop
local make_bitop_uncached
local memoize


-- pad labels	
local _p = {
{ " 1 " , " 2 " , " 3 " } ,
{ " 4 " , " 5 " , " 6 " } ,
{ " 7 " , " 8 " , " 9 " } ,
{ "COR" , "CLR" , "ENT" }
}


local function toFile( t , file )
	local str = textutils.serialize(t)
	if fs.exists(file) then fs.delete(file) end
	local f = fs.open(file,"w")
	f.write(str)
	f.close()
end

local function fromFile( file )
	if ( not fs.exists(file) ) then error("call invalid file") end
	local f = fs.open( file , "r" )
	local table = textutils.unserialize( f.readAll() )
	f.close()
	return table
end


local function init()

-- check if there's a monitor
	for _,v in ipairs( rs.getSides() ) do
		if peripheral.getType( v ) == "monitor" then
			monSide = v
		end
	end
	if monSide == nil then
		error("ERR: NO MONITOR FOUND!")
	else
		m = peripheral.wrap( monSide )
		print( "Monitor found on " .. monSide .. " side." )
	end
	
-- check if there's an iron noteblock

	for _,v in ipairs( rs.getSides() ) do
		if peripheral.getType( v ) == "note" then
			print("Iron noteblock found, sound enabled!")
			sound = true
			n = peripheral.wrap( v )
		end
	end

-- do setup if there's no data

	if ( not fs.isDir("pin") ) then fs.makeDir("pin") end
	if fs.exists("pin/data") then 
		data = fromFile( "pin/data" )
	else
		repeat 
			print("Select Code? (1-5 digit number) ")
			local input = read()
			if #input > 5 then print("PIN TOO LONG.")
			elseif type( string.find( input , "0" ) ) == "number" then print("CANT CONTAIN 0's")
			elseif tonumber(input) == nil then print("NOT A NUMBER")
			else data.pin = sha256(input)
			end
		until ( #input <= 5 ) and ( tonumber( input ) ~= nil ) and ( type( string.find( input , "0" ) ) ~= "number" )
	end	
	if data.scale == nil then changeScale() end
	mainLoop()

end


-- change the data. scale of the keypad (todo:autoscale)
function changeScale()
	local newScale = 0
	repeat 
		print("Input New Scale Value ( 0.5 - 5 )")
		local input = read()
		if ( tonumber(input) == nil ) or ( tonumber(input) < 0.5 ) or ( tonumber(input) > 5 ) then 
			print("invalid number")
		else 
			data.scale = tonumber(input)
			newScale = 1
		end 
	until newScale == 1
	toFile( data , "pin/data")
end

-- create a string containing the numbers already inputted and spaces to fill


function getCurrentInput()
	local curStr = " "
		for k,v in ipairs(curInput) do
			curStr = curStr .. v .. " "
		end
		if #curInput%2 ~= 0 then 
			local curStr = curStr .. " "
		end
		curStr = curStr .. string.rep( " " , 11 - #curStr )
	return curStr
end

-- render the keypad to the monitor

function renderKeys()
	m.setBackgroundColor(data.bgColor)
	m.clear()
	local w , h = m.getSize()
	local _x1 =  math.floor(w/2) - 5 
		if type(data.yVal) == "number" then 
			_y1 = data.yVal
		else 
			_y1 = math.floor(h/2) - 5
		end
	m.setCursorPos(_x1 , _y1)
	m.setTextColor( data.gridColor )
	m.setBackgroundColor( data.gridBgColor )
	m.write("+---+---+---+")
	local _y = _y1+1
	m.setCursorPos(	_x1 , _y )
	m.write("|")
	m.setBackgroundColor( data.bgColor )
	disp.x , disp.y = m.getCursorPos()
	if data.censor == true then 
		local censorStr = string.rep( " *" , #curInput )
				if #censorStr < 11 then
					repeat
						censorStr = censorStr .. " "
					until #censorStr == 11
				end
		m.write( censorStr )
	else
		m.write( getCurrentInput() )
	end
	m.setBackgroundColor( data.gridBgColor ) 
	m.write("|")
	local _y = _y+1
	m.setCursorPos( _x1 , _y )
	m.write("+---+---+---+")
	local _y = _y+1		
		for k,v in ipairs( _p ) do
			m.setCursorPos( _x1 , _y )
			m.setTextColor( data.gridColor )
			m.setBackgroundColor( data.gridBgColor )
			m.write("|")
				for k2,v2 in ipairs(_p[k]) do
					_num = ( k-1 )*3 + k2
					obj[_num] = {}
					obj[_num].label = v2
					obj[_num].x1 , obj[_num].y = m.getCursorPos()
					obj[_num].x2 = ( obj[_num].x1 ) + 2
					if v2 == "COR" then 
						m.setTextColor( colors.orange ) 
						m.setBackgroundColor( colors.black )					
					elseif v2 == "ENT" then 
						m.setTextColor( colors.green )
						m.setBackgroundColor( colors.black )
					elseif v2 == "CLR" then
						m.setTextColor( colors.red )
						m.setBackgroundColor( colors.black )
					else 
						m.setTextColor( data.numColor )
						m.setBackgroundColor( data.bgColor ) 
					end
					m.write( v2 )
					m.setBackgroundColor( data.gridBgColor )
					m.setTextColor( data.gridColor )
					m.write( "|" )
				end
			_y = _y + 1
			m.setCursorPos( _x1 , _y )
			m.write( "+---+---+---+" )
			_y = _y + 1
		end	
end

-- deny/grant access

function denyAccess()
	m.setCursorPos( disp.x , disp.y )
	m.setBackgroundColor( colors.red )
 m.setTextColor( colors.white )
	m.write("  DENIED   ")
	m.setBackgroundColor( data.bgColor )
	m.setTextColor( colors.white )
	if sound then	
		n.playNote( 4 , 23 )
		sleep(0.15)
		n.playNote( 4 , 20 )
	end
	sleep(2)
	mainLoop()
end

function grantAccess()
	m.setCursorPos( disp.x , disp.y )
	m.setBackgroundColor( colors.green )
 m.setTextColor( colors.white )
	m.write("  GRANTED  ")
	m.setBackgroundColor( data.bgColor )
	m.setTextColor( colors.white )
	if sound then	
		n.playNote( 4 , 20 )
		sleep(0.15)
		n.playNote( 4 , 23 )
	end
	if data.invert == true then redstone.setOutput( data.outputSide , false ) elseif data.invert == false then redstone.setOutput( data.outputSide , true ) end
	sleep( data.openTime )
	if data.invert == true then redstone.setOutput( data.outputSide , true ) elseif data.invert == false then redstone.setOutput( data.outputSide , false ) end
	curInput = {}
	mainLoop()
end

-- Checking if the current input is correct

function compareInput()
	local inputStr = ""
		for k,v in ipairs( curInput ) do
			inputStr = inputStr .. v
		end
	inputKey = sha256(inputStr)
	--print( "PIN: " .. data.pin )  
	--print( "INPUT: " .. inputStr )
	curInput = {}
	if data.pin == inputKey then 
		grantAccess() 
	else 
		denyAccess()
	end
end
-- Record the monitor touch

function logInput( ... )
	for k,v in ipairs( arg ) do
		print( k .. " " .. v )  
	end
end

function getInput()
	local e = { os.pullEvent() }
	if e[1] == "monitor_touch" and e[2] == monSide then
		local x , y = e[3] , e[4]
			for k,v in ipairs(obj) do
				if ( x >= v.x1 ) and ( x <= v.x2 ) and ( y == v.y ) then
					if v.label == "CLR" then
						curInput = {}
						if sound then n.playNote( 3 , 1 ) end
					elseif v.label == "ENT" then 
						compareInput()
					elseif v.label == "COR" then 
						table.remove( curInput )
						if sound then n.playNote( 3 , 5 ) end
					elseif ( #curInput < 5 ) then
						table.insert( curInput , tostring(k) )
						if sound then n.playNote( 3 , 12 ) end
					end
				end
			end
	elseif e[1] == "char" then
		if e[2] == "s" then 
			changeScale()
		end
	end
end

function mainLoop()
	while true do
		m.clear()
		m.setTextScale(data.scale)
		renderKeys()
			term.clear()
			term.setCursorPos( 1 , 1 )
			print("S - Scale")
		getInput()
	end
end


--  
--  Secure Hashing Algorithm (SHA-244/256)
--  

local MOD = 2^32
local MODM = MOD-1

function memoize(f)
	local mt = {}
	local t = setmetatable({}, mt)
	function mt:__index(k)
		local v = f(k)
		t[k] = v
		return v
	end
	return t
end

function make_bitop_uncached(t, m)
	local function bitop(a, b)
		local res,p = 0,1
		while a ~= 0 and b ~= 0 do
			local am, bm = a % m, b % m
			res = res + t[am][bm] * p
			a = (a - am) / m
			b = (b - bm) / m
			p = p*m
		end
		res = res + (a + b) * p
		return res
	end
	return bitop
end

function make_bitop(t)
	local op1 = make_bitop_uncached(t,2^1)
	local op2 = memoize(function(a) return memoize(function(b) return op1(a, b) end) end)
	return make_bitop_uncached(op2, 2 ^ (t.n or 1))
end

local bxor1 = make_bitop({[0] = {[0] = 0,[1] = 1}, [1] = {[0] = 1, [1] = 0}, n = 4})

function bxor(a, b, c, ...)
	local z = nil
	if b then
		a = a % MOD
		b = b % MOD
		z = bxor1(a, b)
		if c then z = bxor(z, c, ...) end
		return z
	elseif a then return a % MOD
	else return 0 end
end

function band(a, b, c, ...)
	local z
	if b then
		a = a % MOD
		b = b % MOD
		z = ((a + b) - bxor1(a,b)) / 2
		if c then z = bit32_band(z, c, ...) end
		return z
	elseif a then return a % MOD
	else return MODM end
end

function bnot(x) return (-1 - x) % MOD end

function rshift1(a, disp)
	if disp < 0 then return lshift(a,-disp) end
	return math.floor(a % 2 ^ 32 / 2 ^ disp)
end

function rshift(x, disp)
	if disp > 31 or disp < -31 then return 0 end
	return rshift1(x % MOD, disp)
end

function lshift(a, disp)
	if disp < 0 then return rshift(a,-disp) end 
	return (a * 2 ^ disp) % 2 ^ 32
end

function rrotate(x, disp)
    x = x % MOD
    disp = disp % 32
    local low = band(x, 2 ^ disp - 1)
    return rshift(x, disp) + lshift(low, 32 - disp)
end

local k = {
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
}

function str2hexa(s)
	return (string.gsub(s, ".", function(c) return string.format("%02x", string.byte(c)) end))
end

function num2s(l, n)
	local s = ""
	for i = 1, n do
		local rem = l % 256
		s = string.char(rem) .. s
		l = (l - rem) / 256
	end
	return s
end

function s232num(s, i)
	local n = 0
	for i = i, i + 3 do n = n*256 + string.byte(s, i) end
	return n
end

function preproc(msg, len)
	local extra = 64 - ((len + 9) % 64)
	len = num2s(8 * len, 8)
	msg = msg .. "\128" .. string.rep("\0", extra) .. len
	assert(#msg % 64 == 0)
	return msg
end

function initH256(H)
	H[1] = 0x6a09e667
	H[2] = 0xbb67ae85
	H[3] = 0x3c6ef372
	H[4] = 0xa54ff53a
	H[5] = 0x510e527f
	H[6] = 0x9b05688c
	H[7] = 0x1f83d9ab
	H[8] = 0x5be0cd19
	return H
end

function digestblock(msg, i, H)
	local w = {}
	for j = 1, 16 do w[j] = s232num(msg, i + (j - 1)*4) end
	for j = 17, 64 do
		local v = w[j - 15]
		local s0 = bxor(rrotate(v, 7), rrotate(v, 18), rshift(v, 3))
		v = w[j - 2]
		w[j] = w[j - 16] + s0 + w[j - 7] + bxor(rrotate(v, 17), rrotate(v, 19), rshift(v, 10))
	end

	local a, b, c, d, e, f, g, h = H[1], H[2], H[3], H[4], H[5], H[6], H[7], H[8]
	for i = 1, 64 do
		local s0 = bxor(rrotate(a, 2), rrotate(a, 13), rrotate(a, 22))
		local maj = bxor(band(a, b), band(a, c), band(b, c))
		local t2 = s0 + maj
		local s1 = bxor(rrotate(e, 6), rrotate(e, 11), rrotate(e, 25))
		local ch = bxor (band(e, f), band(bnot(e), g))
		local t1 = h + s1 + ch + k[i] + w[i]
		h, g, f, e, d, c, b, a = g, f, e, d + t1, c, b, a, t1 + t2
	end

	H[1] = band(H[1] + a)
	H[2] = band(H[2] + b)
	H[3] = band(H[3] + c)
	H[4] = band(H[4] + d)
	H[5] = band(H[5] + e)
	H[6] = band(H[6] + f)
	H[7] = band(H[7] + g)
	H[8] = band(H[8] + h)
end

function sha256(msg)
	msg = preproc(msg, #msg)
	local H = initH256({})
	for i = 1, #msg, 64 do digestblock(msg, i, H) end
	return str2hexa(num2s(H[1], 4) .. num2s(H[2], 4) .. num2s(H[3], 4) .. num2s(H[4], 4) ..
		num2s(H[5], 4) .. num2s(H[6], 4) .. num2s(H[7], 4) .. num2s(H[8], 4))
end

init()
