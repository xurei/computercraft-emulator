turbine = peripheral.wrap("bottom")

print("connected " .. tostring(turbine.getConnected()))

print("active " .. tostring(turbine.getActive()))

print("getEnergyStored " .. turbine.getEnergyStored())

print("rotor speed " .. turbine.getRotorSpeed())

print("input amount " .. turbine.getInputAmount())