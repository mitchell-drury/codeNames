
<html>
	<head>
		<title>Spy View</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">	
		
		<link rel="stylesheet" type="text/css" href="css/codeNames.css" media="(min-width:601px)">
		<link rel="stylesheet" type="text/css" href="css/codeNamesSmall.css" media="(max-width:600px)">
		
		<script src="https://code.jquery.com/jquery-2.2.2.min.js" integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI=" crossorigin="anonymous"></script>	
		<script src="js/spyView.js" type="text/javascript" ></script>		
		<script type="text/javascript">
			$(document).ready(function(){
				setButtons();
				gridHeight("window");
				document.addEventListener("fullscreenchange", function() {
					if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
						setGridHeight("window");
					}	
				});
				document.addEventListener("webkitfullscreenchange", function() {
					console.log("Screen Size");
					if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
						setGridHeight("window");
					}	
				});
				document.addEventListener("mozfullscreenchange", function() {
					if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
						setGridHeight("window");
					}	
				});
				document.addEventListener("msfullscreenchange", function() {
					if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
						setGridHeight("window");
					}	
				});
			});
		</script>
			
	</head>
	
	<body>
		<div id="title">
			<h1 class="topBar">Code Names</h1>
			<div class="topBar" id="enterGameId">
				<input type="text" size="6" maxlength="6">
			</div>
			<div id="retrieveGrid" class="topBar controlOption"><img src="graphics/reload.png"></div>
		</div>
		<div id="game">
			<div id="controls">
			</div>
		
			<div id="grid">
			</div>
		</div>

	</body>
</html>