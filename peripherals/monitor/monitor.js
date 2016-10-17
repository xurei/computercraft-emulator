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
		
		var textScale = 1;
		
		out.clear = function()	{
			//this.clearStyle = this.curStyle;
			$elem.css(this.curStyle);
			this.textElem.text("");
			this.lines = {};
			this.x = 1;
			this.y = 1;
		};
		//------------------------------------------------------------------------------	
		
		out.clearLine = function()	{
			this.lines[this.y] = [];
			this.needRefresh = true;
		};
		//------------------------------------------------------------------------------	
		
		out.getCursorPos = function() {
			return [this.x, this.y];
		};
		//------------------------------------------------------------------------------	
		
		out.getWidth = function() {
			var w = Math.floor($elem.parent().width() / (20 * textScale));
			return [Math.max(1, w-1)];
		};
		//------------------------------------------------------------------------------	

		out.getHeight = function() {
			var h = Math.floor($elem.parent().height() / (32 * textScale));
			return [Math.max(1, h-1)];
		};
		//------------------------------------------------------------------------------	

		out.getSize = function() {
			return [this.getWidth()[0], this.getHeight()[0]];
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
			var k = 32768;
			while (k >= 1) {
				if (color & k) { //Single & on purpose
					break;
				}
				k /= 2;
			}
			out.curStyle.background = CCAPI.colors[k];
		};
		//------------------------------------------------------------------------------	

		out.setTextColor = function(color)	{
			var k = 32768;
			while (k >= 1) {
				if (color & k) { //Single & on purpose
					break;
				}
				k /= 2;
			}
			out.curStyle.color = CCAPI.colors[k];
		};
		//------------------------------------------------------------------------------	

		out.setTextScale = function(ratio)	{
			ratio = Math.floor(ratio * 2) / 2;
			
			//TODO error if ratio not in range 0.5-5
			if (ratio < 0.5) {
				ratio = 0.5;
			}
			else if (ratio > 5) {
				ratio = 5;
			}
			
			textScale = ratio;
			
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
				
				var letterW = 20 * textScale;
				var letterH = 32 * textScale;
				
				this.textElem.attr('width', this.textElem.parent().width());
				this.textElem.attr('height', this.textElem.parent().height());
				var ctx = this.textElem.get(0).getContext("2d");
				
				for (var y in this.lines) {
					var line = this.lines[y];
					for (var x in line) {
						var char = line[x];
						ctx.font = (28*textScale) + 'px "mc"';
						ctx.fillStyle = char.style.color;
						ctx.fillText(char.char, x*letterW,y*letterH);
						if (char.style.background != undefined) {
							ctx.fillStyle = char.style.background;
							ctx.fillRect(x*letterW,y*letterH,letterW,letterH);
						}
					}
				}
				
				/*this.textElem.find('tr').remove();
				
				var max_x = 0;
				var max_y = 0;
				for (var y in this.lines) {
					if (max_y < parseInt(y)) {
						max_y = parseInt(y);
					}
				}

				for (y=1; y<=max_y; ++y) {
					var line = this.lines[y];
					for (x in line) {
						if (max_x < parseInt(x)){
							max_x = parseInt(x);
						}
					}
				}
				
				console.log(this.getWidth()[0], this.getHeight()[0]);
				var tr = $('<tr></tr>');
				for (var x=1; x<=this.getWidth()[0]; ++x)
					tr.append($('<td style="line-height:1px">&nbsp;</td>'));
				this.textElem.append(tr);
				
				for (y=1; y<=max_y; ++y){
					var line = this.lines[y];
					var tr = $('<tr></tr>');
					if (line == undefined) {
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
					}
					this.textElem.append(tr);
				}
				var elapsed = new Date() - start;*/
			}
		};
		//------------------------------------------------------------------------------

		var loop = function()
		{
			out.__refresh();
			setTimeout(function() {
				window.requestAnimationFrame(loop);
			}, 100);
		};
		
		window.requestAnimationFrame(loop);
		
		return out;
	};
	
	CCAPI.peripheralTypes["monitor"].constructor = CCAPI.Monitor;
})(window.CCAPI);
