(function (CCAPI)
{
	CCAPI.redstone = function ($elem) {
		var out = CCAPI.basePeripheral($elem);

		//out._addOnOffGetter('getInput', '.input-is-active');
		//out._addNumGetter('getAnalogInput', '[name="input-strength"]');
		out._addNumGetter('getAnalogOutput', '.output-strength');

		var $output_strength = $elem.find('.output-strength');
		var $input_strength = $elem.find('[name="input-strength"]');
		console.log($input_strength);

		out.getAnalogInput = function()
		{
			var valOut = out.getAnalogOutput()[0];
			var valIn = parseFloat($input_strength.val());
			return [Math.max(valIn, valOut)];
		}
		out.getInput = function()
		{
			var val = out.getAnalogInput();
			return [(val[0] > 0)];
		}
		out.getOutput = function()
		{
			var val = out.getAnalogOutput();
			return [(val[0] > 0)];
		}

		out.setAnalogOutput = function(value)
		{
			value = Math.max(0, Math.min(15, value));
			setTimeout(function(){
				$output_strength.text(value);
			}, 100);
		}
		out.setOutput = function(value)
		{
			out.setAnalogOutput(value==true || value==1 || value=="true" ? 15 : 0);
		}

		$elem.find('.output-strength').text(0);
		
		return out;
	};
	
	CCAPI.peripheralTypes["redstone"].constructor = CCAPI.redstone;
})(window.CCAPI);