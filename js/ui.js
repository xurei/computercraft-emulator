
(function($){
	var onload = window.onload;
	window.onload = function() {
		if (onload) onload();
		
		CCAPI.registerPeripheral("monitor", "ComputerCraft Monitor");
		
		var current_side = null;
		
		//--------------------------------------------------------------------------
		
		$('.togglable').click(function(){
			$(this).parent().find('.togglable').removeClass('active');
			$(this).addClass('active');
		});
		
		$('#sides-pane .side').click(function(){
			var side = $(this).attr('data-side');
			current_side = side;
			$('#right-pane .side').removeClass('active')
			$('#right-pane .side-'+side).addClass('active')
		});

		//Show console as init
		$('#sides-pane .side[data-side="console"]').click();
		//--------------------------------------------------------------------------
		
		$('#console-clear').click(function(){
			$('#console').text('');
		});
		//--------------------------------------------------------------------------
		
		$('.select-block-type').change(function(){
			var $this = $(this);
			var periph_type = $this.val();
			var $side = $('#right-pane .side-'+current_side+" .side-content");
			var $side_periph = $('#sides-pane .side[data-side="'+current_side+'"] .periph');
			
			if (periph_type == "none")
			{
				CCAPI.peripherals[current_side] = null;
				$side.text('');
				$side_periph.text('');
			}
			else
			{
				CCAPI.peripherals[current_side] = CCAPI.buildPeripheral(periph_type, $side);
				CCAPI.peripherals[current_side]._periph_name = periph_type;
				$side.text('').append(CCAPI.peripherals[current_side].elem);
				$side_periph.text(periph_type);
			}
		});
		//--------------------------------------------------------------------------
		
		$('#sides-pane .run').click(function(){
			var text = window.editor.getValue();
			try
			{
				Lua.eval(L, text);
			}
			catch(e)
			{
				//Show console
				$('#sides-pane .side[data-side="console"]').click();
				
				console.error(e);
			}
		});
		//--------------------------------------------------------------------------
		
		window.console.enable();
	};
})(jQuery)