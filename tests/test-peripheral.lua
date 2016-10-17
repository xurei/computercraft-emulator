a,b = unpack({5,6})

print(a)
print(b)

mon1,mon2 = peripheral.find("monitor")

print(mon1)
print(mon2)

mon1.write("ok1");
mon2.write("ok2");