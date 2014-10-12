(function (CCAPI)
{
	CCAPI.basePeripheral = function ($elem) {
		var out = {};
		out.elem = $elem;
		//--------------------------------------------------------------------------

		/**
		 * Creates a getter of an text input
		 */
		out._addStrGetter = function(fn_name, target_selector) {
			var $target = $elem.find(target_selector); 
			out[fn_name] = function() {
				return [$target.val()];
			}
		} 
		//--------------------------------------------------------------------------

		/**
		 * Creates a getter of an number input
		 */
		out._addNumGetter = function(fn_name, target_selector, dependencies) {
			var $target = $elem.find(target_selector);
			out[fn_name] = function() {
				var dependencies_ok = true;
				if (dependencies != undefined)
				{
					for (i in dependencies)
					{
						var d = dependencies[i];
						var r = out[d]();
						if (r[0] == false)
							dependencies_ok = false;
					}
				}
				
				if (dependencies_ok)
				{
					if ($target.get(0).tagName == "INPUT")
						return [parseFloat($target.val())];
					else
						return [parseFloat($target.text())];
				}
				else
					return [0];
			}
		} 
		//--------------------------------------------------------------------------

		/**
		 * Creates a getter of a On/Off button
		 */
		out._addOnOffGetter = function(fn_name, target_selector) {
			var $target = $elem.find(target_selector); 
			out[fn_name] = function() { 
				return [$target.hasClass('active')];
			}
		} 
		//--------------------------------------------------------------------------
		
		return out;
	};
})(window.CCAPI);