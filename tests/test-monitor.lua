-- local x = 42
-- y = 42 + 1
-- js.global:alert(y) -- this is Lua!

print(peripheral.isPresent("top"))
print(peripheral.isPresent("right"))

monitor = peripheral.wrap("right")
 
monitor.clear()
monitor.setTextColor(colors.orange)
monitor.setTextScale(1)
monitor.setCursorPos(5,1)
-- monitor.write("All the bees on")
monitor.write("12345678901234567890123456789012345678901234567890")
monitor.setCursorPos(1,2)
monitor.write("12345678901234567890123456789012345678901234567890")
monitor.setCursorPos(1,3)
monitor.write("abcdefghijklmnopqrstuvwxyz")
monitor.setCursorBlink(true)
 
local y = 5
monitor.setCursorPos(1,y)
monitor.write("Life      Shortest")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Speed         Fast")

x,y = monitor.getCursorPos()
print("ok")
print(x,y)

monitor.scroll(1)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("Pollin.       Fast")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Flowers    Flowers")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Fertility       x4")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Area         9x6x9")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Effect        None")
y=y+1
monitor.setCursorPos(1,y)
monitor.write("Tolerance   Both 5")

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)

y=y+1
monitor.setCursorPos(1,y)
monitor.write("test" .. y)
