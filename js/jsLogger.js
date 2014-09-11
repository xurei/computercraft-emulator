window.console=(function(origConsole, $){
	if(!window.console)
		window.console = {};
	var isDebug=true;
	var enabled=false;
	
	var $console = $('#console');
	
	var addToLog = function (className, message)
	{
		var $el = $('<div class="'+className+'">'+message+'</div>');
		$console.append($el);
	}
	
	return {
		enable: function(){
			enabled = true;
		},
		log: function(){
			isDebug && origConsole.log && origConsole.log.apply(origConsole,arguments);
			if (enabled)
			{
				for (i in arguments)
				{
					addToLog("", arguments[i]);
				}
			}
		},
		error: function(){
			isDebug && origConsole.error && origConsole.error.apply(origConsole,arguments);
			//Parsing the error string
			if (enabled)
			{
				for (i in arguments)
				{
					var message = ""+arguments[i];
					if (message.substring(0,10) == "Lua.Error:")
					{
						var errmsg = message.substring(10);
						var data = errmsg.split(":");
						var line = data[1];
						
						window.editor.getSession().setAnnotations([{
						  row: line-1,
						  text: data[2],
						  type: "error" // also warning and information
						}]);
					}
					addToLog("error", arguments[i])
					//$console.append(arguments[i]+"<br>");
				}
			}
		},
		
		warn: function(){
			isDebug && origConsole.warn && origConsole.warn.apply(origConsole,arguments);
		},
		info: function(v){
			isDebug && origConsole.info && origConsole.info.apply(origConsole,arguments);
		},
		debug: function(bool){
			isDebug = bool;
		}
	};
}(window.console, jQuery));
