(function (CCAPI)
{
	CCAPI.Monitor = function ($elem) {
		var out = {};
		out.elem = $elem;
		out.textElem = $elem.find('> .text');
		out.lines = [];

		out.x = 1;
		out.y = 1;
		out.curStyle = {color:"#fff", background:"#000"};
		out.clearStyle = {color:"inherit", background:"inherit"};
		
		out.needRefresh = true;
		
		out.clear = function()	{
			//this.clearStyle = this.curStyle;
			this.elem.css(this.curStyle);
			this.textElem.text("");
			this.lines = {};
		};
		//------------------------------------------------------------------------------	
		
		out.clearLine = function()	{
			this.lines[this.y] = [];
			this.needRefresh = true;
		};
		//------------------------------------------------------------------------------	
		
		out.getCursorPos = function() {
			console.debug("getcursorPos");
			return [this.x, this.y];
		};
		//------------------------------------------------------------------------------	
		
		out.getWidth = function() {
			return [100];
		};
		//------------------------------------------------------------------------------	

		out.getHeight = function() {
			return [100];
		};
		//------------------------------------------------------------------------------	

		out.getSize = function() {
			return [100,100];
		};
		//------------------------------------------------------------------------------	
		
		out.isColor = function() {
			return [true];
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
			this.needRefresh = true;
		};
		//------------------------------------------------------------------------------	

		out.setCursorBlink = function(b)	{
			console.log("setCursorBlink not supported yet")
		};
		//------------------------------------------------------------------------------

		out.setCursorPos = function(x,y)	{
			this.y = parseInt(y);
			this.x = parseInt(x);
			if (this.lines[y] == undefined)
				this.__newLine();
		};
		//------------------------------------------------------------------------------

		out.setBackgroundColor = function(color)	{
			var k = 32768
			while (k >= 1) {
				if (color & k)
				{
					break;
				}
				k /= 2;
			}
			out.curStyle.background = CCAPI.colors[k]
		};
		//------------------------------------------------------------------------------	

		out.setTextColor = function(color)	{
			var k = 32768
			while (k >= 1) {
				if (color & k)
					break;
				k /= 2;
			}
			out.curStyle.color = CCAPI.colors[k]
		};
		//------------------------------------------------------------------------------	

		out.setTextScale = function(ratio)	{
			this.textElem.css('font-size', ratio + "em");
		};
		//------------------------------------------------------------------------------
		
		out.write = function(text)	{
			if (this.lines[this.y] == undefined) {
				this.__newLine();
			}
			for (var i=0; i<text.length; ++i) {
				this.lines[this.y][this.x+i] = {style:$.extend({}, this.curStyle), char:text.charAt(i)};
			}
			this.x += text.length;
			this.needRefresh = true;
		};
		//------------------------------------------------------------------------------	
		
		out.__newLine = function() {
			this.lines[this.y] = [];
			for (var i=1; i <= this.x; ++i) {
				this.lines[this.y][i] = {style:{}, char:" "};
			}
		};
		//------------------------------------------------------------------------------	
		
		out.__refresh = function() {
			if (out.needRefresh){
				var start = new Date();
				this.needRefresh = false;
				this.textElem.text("");
				
				var max_y = 0;
				for (y in this.lines) {
					if (max_y < parseInt(y))
						max_y = parseInt(y);
				}
				

				var max_x = 0;
				for (y=1; y<=max_y; ++y){
					var line = this.lines[y];
					for (x in line) {
						if (max_x < parseInt(x)){
							max_x = parseInt(x);
						}
					}
				}

				var tr = $('<tr></tr>');
				for (x=1; x<=max_x; ++x)
					tr.append($('<td style="line-height:20px">&nbsp;</td>'));
				this.textElem.append(tr);
				
				for (y=1; y<=max_y; ++y){
					var line = this.lines[y];
					var tr = $('<tr></tr>');
					if (line == undefined) {
						//for (x=1; x<=50; ++x)
							tr.append($('<td>&nbsp;</td>'));
					}
					else {
						var max_x = 0;
						for (x in line) {
							if (max_x < parseInt(x)){
								max_x = parseInt(x);
							}
						}
						
						var cur_td = $('<td></td>');
						var cur_style = null;
						var cur_text = "";
						
						var style_cmp = function (style1, style2)
						{
							return (style1.color == style2.color && style1.background == style2.background);
						};
						
						for (x=1; x<=max_x; ++x) {
							if (cur_style==null) {
								cur_style = line[x].style;
								cur_td.css(cur_style);
							}
							var line_style = (line[x] == undefined) ? this.clearStyle : line[x].style;
							var char = (line[x] == undefined) ? ' ' : line[x].char;
							if (!style_cmp(cur_style, line_style)) {
								cur_td.text(cur_text);
								cur_td.attr('colspan', cur_text.length);
								tr.append(cur_td);
								
								cur_td = $('<td></td>');
								cur_text = "";
								cur_style = line_style;
								cur_td.css(cur_style);
							}
							cur_text += char;
						}
						cur_td.text(cur_text);
						cur_td.attr('colspan', cur_text.length);
						tr.append(cur_td);
						
						/*for (x=1; x<=max_x; ++x){
							var td = $('<td></td>');
							if (line[x] != undefined) {
								td.text(line[x].char);
								td.css(line[x].style);
							}
							tr.append(td);
						}*/
					}
					this.textElem.append(tr);
				}
				var elapsed = new Date() - start;
				console.log(elapsed + " ms");
			}
		};
		//------------------------------------------------------------------------------

		var loop = function()
		{
			out.__refresh();
		}
		setInterval(loop, 200);
		
		return out;
	};
	
	CCAPI.peripheralTypes["monitor"].constructor = CCAPI.Monitor;
})(window.CCAPI);
