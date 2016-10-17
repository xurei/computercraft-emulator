<!DOCTYPE html>
<html>
<head>
	<title>Computercraft Emulator</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div id="header">
		<ul class="fright">
			<li><a href="http://www.xurei-design.be">xurei-design</a></li>
		</ul>
		<ul>
			<li><a href="javascript:;" class="about-link">About</a></li>
			<?php
			/*
			<li><a href="javascript:;">Donate</a></li>
			*/?>
		</ul>
	</div>
	<div id="main" class="row-fluid">
		<section id="left-pane">
			<div id="editor">print("hello world !")</div>
		</section>
		<section id="resize-line">
		</section>
		<div id="sides-pane">
			<ul>
				<li data-side="console" class="side togglable active">Console</li>
				<?php /*<li data-side="term" class="side togglable active">Term</li>*/ ?>
				<li data-side="top"     class="side togglable">top<div class="periph"></div></li>
				<li data-side="left"    class="side togglable">left<div class="periph"></div></li>
				<li data-side="right"   class="side togglable">right<div class="periph"></div></li>
				<li data-side="front"   class="side togglable">front<div class="periph"></div></li>
				<li data-side="back"    class="side togglable">back<div class="periph"></div></li>
				<li data-side="bottom"  class="side togglable">bottom<div class="periph"></div></li>
				<li class="run">Run</li>
				<li class="separator"></li>
				<li class="pastebin">Send to Pastebin</li>
			</ul>
		</div>
		<section id="right-pane">
			<?php /*<div class="side side-term active">
				<div class="side-header">
					<a id="term-clear" href="javascript:;">Clear</a>
				</div>
				<div class="side-content">
					<pre id="term"></pre>
				</div>
			</div>*/ ?>
			<div class="side side-console active">
				<div class="side-header">
					<a id="console-clear" href="javascript:;">Clear</a>
				</div>
				<div class="side-content">
					<pre id="console"></pre>
				</div>
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

	<div class="popup-overlay" id="about-page">
		<?php include "about.php" ?>
	</div>
	<div class="popup-overlay" id="pastebin-result">
		<div class="popup-page">
			<div class="content">
				<div class="popup-close keybind-esc">&times;</div>
				<div class="loading">Please wait...</div>
				<div class="loaded">
					<p>Paste this on your computer :</p>
					<input type="text" value="pastebin get DFzedsCe startup" id="pastebin-result-command"><br>
					<a id="pastebin-result-link" href="http://www.pastebin.com/">Link to the paste</a>
				</div>
			</div>
		</div>
	</div>

	<script src="js/jquery.min.js"></script>
	<?/*<script src="js/jsLogger.js" type="text/javascript"></script>*/?>
	<script src="js/jquery.tmpl.min.js"></script>
	<script src="js/api.js?_t=<?=rand()?>"></script>

	<script src="js/ace/ace.js" type="text/javascript"></script>
	<script>
		window.editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/lua");
	</script>

	<script src="js/requestAnimationFrame.js?_t=<?=rand()?>"></script>
	<script src="js/ui.js?_t=<?=rand()?>"></script>
	<script src="js/nav.js?_t=<?=rand()?>"></script>

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