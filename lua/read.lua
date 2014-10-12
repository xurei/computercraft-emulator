function read()
	return coroutine.yield('{"type":"READ"}')
end