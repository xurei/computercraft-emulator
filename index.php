<!DOCTYPE html>
<html>
<head>
	<title>Computercraft Emulator</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div id="main" class="row-fluid">
		<section id="left-pane">
			<div id="editor">print("hello world !")</div>
		</section>
		<div id="sides-pane">
			<ul>
				<li data-side="console" class="side togglable active">Console</li>
				<li data-side="top"     class="side togglable">top<div class="periph"></div></li>
				<li data-side="left"    class="side togglable">left<div class="periph"></div></li>
				<li data-side="right"   class="side togglable">right<div class="periph"></div></li>
				<li data-side="front"   class="side togglable">front<div class="periph"></div></li>
				<li data-side="back"    class="side togglable">back<div class="periph"></div></li>
				<li data-side="bottom"  class="side togglable">bottom<div class="periph"></div></li>
				<li class="run">Run</li>
			</ul>
		</div>
		<section id="right-pane">
			<div class="side side-console">
				<div class="side-header">
					<a id="console-clear" href="javascript:;">Clear</a>
				</div>
				<pre class="side-content" id="console"></pre>
			</div>
			<?php 
			$sides = array("top","bottom","left","right","front","back");
			foreach ($sides as $s) {?>
				<div class="side side-<?= $s ?>">
					<div class="side-header">
						<form>
							<select class="select-block-type">
								<option value="none">None</option>
							</select>
						</form>
					</div>
					<div class="side-content"></div>
				</div>
			<?php }?>
		</section>
	</div>

	<script src="js/jquery.min.js"></script>
	<?/*<script src="js/jsLogger.js" type="text/javascript"></script>*/?>
	<script src="js/jquery.tmpl.min.js"></script>
	<script src="js/lua.vm.js"></script>
	<script src="js/lua.vm.extend.js"></script>
	<script src="js/util.js"></script>
	<script src="js/api.js"></script>
	
	<script src="js/ace/ace.js" type="text/javascript"></script>
	<script>
	    window.editor = ace.edit("editor");
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/lua");
	</script>
	<script src="js/requestAnimationFrame.js"></script>

	<script src="js/ui.js"></script>
	
	<?php if (!file_exists("/home/olivier")): ?>
	<?php $ga_code=""; if (file_exists(dirname(__FILE__)."/ga_code.txt")) $ga_code=file_get_contents(dirname(__FILE__)."/ga_code.txt"); ?>
		<script>
			var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', '<?= $ga_code ?>']);
		  _gaq.push(['_trackPageview']);
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
	<?php else: ?>
		<script src="/cssrefresh.js" type="text/javascript"></script>
	<?php endif ?>
	
</body>
</html>