<!DOCTYPE htmightl>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div id="main" class="row-fluid">
		<section id="left-pane">
			<div id="editor">print("hello world !")
	
monitor = peripheral.wrap("right")
monitor.clear()
			</div>
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
				<div class="side-content" id="console"></div>
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
	<script src="js/jsLogger.js" type="text/javascript"></script>
	<script src="js/jquery.tmpl.min.js"></script>
	<script src="lua.vm.js"></script>
	<script src="lua.vm.extend.js"></script>
	<script src="js/util.js"></script>
	<script src="js/api.js"></script>
	
	<script type="text/lua">
		<?php include "lua/math.lua"; ?>
		<?php include "lua/bit.lua"; ?>
	</script>
	<script type="text/lua">
		<?php include "lua/colors.lua"; ?>
	</script>
	<script type="text/lua">
		<?php include "lua/util.lua"; ?>
	</script>
	<script type="text/lua">
		<?php include "lua/periph/peripheral.lua"; ?>
	</script>
	<?php /*
	<script type="text/lua">
		<?php include "tests/test-bit.lua"; ?>
		<?php include "tests/test-colors.lua"; ?>
	</script>
	*/ ?>
	<?php /*<script type="text/lua">
		<?php include "lua/test.lua"; ?>
	</script> */?>
	<?php /*
	<script type="text/lua">
		<?php include "lua/bigreactor-monitor.lua"; ?>
	</script>
	*/ ?>
	<script src="js/ace/ace.js" type="text/javascript"></script>
	<script>
	    window.editor = ace.edit("editor");
	    editor.setTheme("ace/theme/monokai");
	    editor.getSession().setMode("ace/mode/lua");
	</script>

	<script src="js/ui.js"></script>
	
</body>
</html>