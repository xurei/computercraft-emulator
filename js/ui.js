(function($){
	var onload = window.onload;
	window.onload = function() {
		if (onload) onload();

		CCAPI.registerPeripheral("monitor", "ComputerCraft Monitor");
		CCAPI.registerPeripheral("redstone", "Redstone");
		CCAPI.registerPeripheral("bigreactors-computer-port", "BigReactors Computer Port");
		
		var current_side = null;
		
		var worker = new Worker('js/lua_worker.js?_t='+Math.random());
		
		var $console = $('#console');
		
		//--------------------------------------------------------------------------
		
		$('.togglable').click(function(){
			$(this).parent().find('.togglable').removeClass('active');
			$(this).addClass('active');
		});
		
		$('#sides-pane .side').click(function(){
			var side = $(this).attr('data-side');
			current_side = side;
			$('#right-pane .side').removeClass('active');
			$('#right-pane .side-'+side).addClass('active');
		});

		//Show console as init
		$('#sides-pane .side[data-side="console"]').click();
		//--------------------------------------------------------------------------
		
		$('#console-clear').click(function(){
			$('#console').text('');
		});
		//--------------------------------------------------------------------------

		var activable_fn = function (e) {
			if (e.target == e.currentTarget)
				$(e.currentTarget).toggleClass('active');
		};
		var activable_bind = function($el) {
			$el.find(".activable").off('click').on('click', activable_fn);
		};
		//--------------------------------------------------------------------------
		
		var change_block_type = function(side, periph_type)
		{
			var $side = $('#right-pane .side-'+side+" .side-content");
			var $side_periph = $('#sides-pane .side[data-side="'+side+'"] .periph');
			
			if (periph_type == "none")
			{
				localStorage.setItem('side_'+side, null);
				
				CCAPI.peripherals[side] = null;
				$side.text('');
				$side_periph.text('');
			}
			else
			{
				localStorage.setItem('side_'+side, periph_type);
				
				CCAPI.peripherals[side] = CCAPI.buildPeripheral(periph_type, $side);
				CCAPI.peripherals[side]._periph_name = periph_type;
				$side.text('').append(CCAPI.peripherals[side].elem);
				$side_periph.text(periph_type);
				$side.find('.activable').click();
				activable_bind($side);
			}
		};
		
		change_block_type('term', 'monitor');
		
		$('.select-block-type').change(function(){
			var periph_type = $(this).val();
			change_block_type(current_side, periph_type);
		});
		
		//--------------------------------------------------------------------------
		
		function emulateMessage (vVal) {
		    return eval("(" + JSON.stringify(vVal) + ")");
		}
		//--------------------------------------------------------------------------
		
		function getPeriphSignature(periph) {
			if (!periph) {
				return null;
			}
			var out = {
				type: periph._periph_name,
				methods: []
			};
			for (i in periph) {
				if (i.substring(0,2) != "__")
					out.methods.push(i);
			}
			return out;
		}
		//--------------------------------------------------------------------------

		var handleEvent = function(e){
			e = e.data;
			switch(e.type)
			{
				case "CALL":
				case "CALLASYNC":{
					var side = e.side;
					var method = e.method;
					var args = e.args;
					args = $.map(args, function(value, index) {
				    return [value];
					});
					var peripheral = CCAPI.peripherals[side];
					method = peripheral[method];
					
					var out = method.apply(peripheral, args);
					if (e.type == "CALL")
						worker.postMessage({type:"CALL_RETURN", value:out});
					break;
				}
				case "SLEEP":{
					var time = parseFloat(e.time);
					setTimeout(function(){
						worker.postMessage({type:"CALL_RETURN", value:null});
					}, time*1000);
					break;
				}
				case "END":{
					var $run_btn = $('#sides-pane .run');
					$run_btn.attr('data-running', "0");
					$run_btn.text("Run");
					worker.postMessage({type:"STOP"});
					break;
				}
				case "ERROR":{
					var data = e.message.split(":");
					var line = data[1]-2;
					console.log('ERROR '+line);
					window.editor.getSession().setAnnotations([{
					  row: line,
					  text: data[2],
					  type: "error" // also warning and information
					}]);
					$console.append("ERROR : Line "+(line+1)+" - "+data[2]+"<br>");
					break;
				}
				case "PRINT":{
					$console.append(e.prefix+" "+e.data+"<br>");
					CCAPI.peripherals.term.write(e.data);
					CCAPI.peripherals.term.setCursorPos(1, CCAPI.peripherals.term.getCursorPos()[1]+1);
					//console.log("{Lua} " + e.data);
					break;
				}
				case "READ":{
					var value = prompt();
					worker.postMessage({type:"CALL_RETURN", value:value});
					break;
				}
			}
		};
		worker.addEventListener("message", handleEvent);
		//--------------------------------------------------------------------------
		
		$('#sides-pane .run').click(function(){
			var text = "" + window.editor.getValue();
			
			var $this = $(this);
			
			var running = $this.attr('data-running');
			if (running === "1") {
				$this.attr('data-running', "0");
				worker.postMessage({type:"STOP"});
				$this.text("Run");
			}
			else {
				$this.attr('data-running', "1");
				$this.text("Stop");

				localStorage.setItem('code', text);
				
				var periph = {
					term: getPeriphSignature(CCAPI.peripherals.term),
					left: getPeriphSignature(CCAPI.peripherals.left),
					right: getPeriphSignature(CCAPI.peripherals.right),
					top: getPeriphSignature(CCAPI.peripherals.top),
					bottom: getPeriphSignature(CCAPI.peripherals.bottom),
					front: getPeriphSignature(CCAPI.peripherals.front),
					back: getPeriphSignature(CCAPI.peripherals.back)
				};
				
				worker.postMessage({type:"START", code: text, peripherals: periph});
			}
				
			//worker.postMessage('L', eval("(" + JSON.stringify(L) + ")"));
			//lua_parser.parse(text);
			//Lua.eval(L, text);
		});
		//--------------------------------------------------------------------------
		
		//Loading configuration
		var sides = ['left','right','top','bottom','front','back'];
		for (i in sides)
		{
			var side = sides[i];
			var block = localStorage.getItem('side_'+side);
			if (block!=null & block!=undefined) {
				$('.side-'+side+' select').val(block);
				change_block_type(side, block);
			}
		}

		var code = localStorage.getItem('code');
		if (code != null && code != undefined)
			window.editor.setValue(code);
	};
})(jQuery);
