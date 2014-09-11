reactor = peripheral.wrap("back")
mon = peripheral.wrap("top")
mon.clear()
mon.setBackgroundColor(colors.blue)
color = blue

--power = 0
--fuel = 0
--maxFuel = 0
--rf = 0

function calc(min, max)

  percent = 53 / max 
  
  x = percent * min
  
  --print("percent: "..percent.." x: "..x)
  
  return 53, x

end

function progress(current, max, pos1, pos2)

--Power
  maxX,x = calc(current,max)
  for i=0,3 do
    for z=1,maxX do
      mon.setCursorPos(pos1+z,pos2+i)
      if z <= x then
        mon.setBackgroundColor(colors.green)
      else
        mon.setBackgroundColor(colors.white)
      end

      mon.write(" ")
    end
  end
end

function draw(color)
  mon.clear()

  power = reactor.getEnergyStored()
  maxPower = 10000000
  fuel = reactor.getFuelAmount()
  maxFuel = reactor.getFuelAmountMax()
  rf = reactor.getEnergyProducedLastTick()
  maxRf = 10000

  mon.setCursorPos(28,1)
  mon.write("Reactor")

  mon.setCursorPos(2,4)
  mon.write("Power:")
  mon.setCursorPos(1,5)
  mon.write(math.floor(power/1000).."kRF")

  mon.setCursorPos(2,10)
  mon.write("Fuel:")
  mon.setCursorPos(1,11)
  mon.write(math.floor((fuel/maxFuel)*100).."%")

  mon.setCursorPos(2,16)
  mon.write("RF/t:")
  mon.setCursorPos(1,17)
  mon.write(math.floor(rf/1000).."kRF/t")

  progress(power,maxPower,7,3)
  progress(fuel,maxFuel,7,9)
  progress(rf,maxRf,7,15)
  
  if reactor.getActive() == true then
    mon.setBackgroundColor(colors.blue)
  else
    mon.setBackgroundColor(colors.red)
  end
end

while true do

  draw(color)

  if reactor.getEnergyStored() >=9000000 then
    reactor.setActive(false)
    mon.setBackgroundColor(colors.red)
    color = red
  end

  if reactor.getEnergyStored() <= (10000000/4) then
    reactor.setActive(true)
    mon.setBackgroundColor(colors.blue)
    color = blue
  end

  sleep(2)
end