(function ()
{
	var CCAPI = window.CCAPI;
	CCAPI.Monitor = function ($elem) {
		var out = {};
		out.elem = $elem;
		out.textElem = $elem.find('> .text');
		out.lines = [];

		out.x = 0;
		out.y = 0;
		
		out.clear = function()	{
			this.textElem.text("");
			this.lines = {};
		};
		//------------------------------------------------------------------------------	
		
		out.clearLine = function()	{
			this.textElem.text("");
			this.lines[this.y] = "";
			this.__refresh();
		};
		//------------------------------------------------------------------------------	
		
		out.getWidth = function() {
			return 100;
		};
		//------------------------------------------------------------------------------	
		
		out.getHeight = function() {
			return 100;
		};
		//------------------------------------------------------------------------------	
		
		out.scroll = function(n) {
			var newlines = [];
			for (i in this.lines)
			{
				newlines[i-n] = this.lines[i];
			}
			this.lines = [];
			for (var i=1; i<=this.getHeight(); ++i)
				if (newlines[i] != undefined)
					this.lines[i] = newlines[i];
			this.__refresh();
		};
		//------------------------------------------------------------------------------	

		out.setCursorBlink = function(b)	{
			console.log("setCursorBlink not supported yet")
		};
		//------------------------------------------------------------------------------

		out.setCursorPos = function(x,y)	{
			this.y = y;
			if (this.lines[y] == undefined)
				this.lines[y] = "";
			while (this.lines[y].length+1 < x)
				this.lines[y]+=".";
		};
		//------------------------------------------------------------------------------

		out.setBackgroundColor = function(i)	{
			console.log("setBackgroundColor not supported yet");
		};
		//------------------------------------------------------------------------------	

		out.setTextColor = function(i)	{
			console.log("setTextColor not supported yet");
		};
		//------------------------------------------------------------------------------	

		out.setTextScale = function(ratio)	{
			this.textElem.css('font-size', ratio + "em");
		};
		//------------------------------------------------------------------------------
		
		out.write = function(text)	{
			if (this.lines[this.y] == undefined)
				this.lines[this.y] = "";
			for (var i = 0; i<text.length; ++i)
			{
				this.lines[this.y] = this.lines[this.y].replaceAt([this.x + i], text.charAt(i));
			}
			this.__refresh();
		};
		//------------------------------------------------------------------------------	
		
		out.__refresh = function() {
			this.textElem.text("");
			for (var i=1; i<=this.getHeight(); ++i)
			{
				var l = this.lines[i];
				if (l == undefined)
					l = "";
				this.textElem.append(l + "\n");
			}
		};
		//------------------------------------------------------------------------------
		
		return out;
	};
	
	CCAPI.peripheralTypes["monitor"].constructor = CCAPI.Monitor;
})();
