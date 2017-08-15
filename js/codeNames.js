var wordBank = ["AFRICA","AGENT","AIR","ALIEN","ALPS","AMAZON","AMBULANCE","AMERICA","ANGEL","ANTARCTICA","APPLE","ARM","ATLANTIS","AUSTRALIA","AZTEC","BACK","BALL","BAND","BANK","BAR","BARK","BAT","BATTERY","BEACH","BEAR","BEAT","BED","BEIJING","BELL","BELT","BERLIN","BERMUDA","BERRY","BILL","BLOCK","BOARD","BOLT","BOMB","BOND","BOOM","BOOT","BOTTLE","BOW","BOX","BRIDGE","BRUSH","BUCK","BUFFALO","BUG","BUGLE","BUTTON","CALF","CANADA","CAP","CAPITAL","CAR","CARD","CARROT","CASINO","CAST","CAT","CELL","CENTAUR","CENTER","CHAIR","CHANGE","CHARGE","CHECK","CHEST","CHICK","CHINA","CHOCOLATE","CHURCH","CIRCLE","CLIFF","CLOAK","CLUB","CODE","COLD","COMIC","COMPOUND","CONCERT","CONDUCTOR","CONTRACT","COOK","COPPER","COTTON","COURT","COVER","CRANE","CRASH","CRICKET","CROSS","CROWN","CYCLE","CZECH","DANCE","DATE","DAY","DEATH","DECK","DEGREE","DIAMOND","DICE","DINOSAUR","DISEASE","DOCTOR","DOG","DRAFT","DRAGON","DRESS","DRILL","DROP","DUCK","DWARF","EAGLE","EGYPT","EMBASSY","ENGINE","ENGLAND","EUROPE","EYE","FACE","FAIR","FALL","FAN","FENCE","FIELD","FIGHTER","FIGURE","FILE","FILM","FIRE","FISH","FLUTE","FLY","FOOT","FORCE","FOREST","FORK","FRANCE","GAME","GAS","GENIUS","GERMANY","GHOST","GIANT","GLASS","GLOVE","GOLD","GRACE","GRASS","GREECE","GREEN","GROUND","HAM","HAND","HAWK","HEAD","HEART","HELICOPTER","HIMALAYAS","HOLE","HOLLYWOOD","HONEY","HOOD","HOOK","HORN","HORSE","HORSESHOE","HOSPITAL","HOTEL","ICE","ICE CREAM","INDIA","IRON","IVORY","JACK","JAM","JET","JUPITER","KANGAROO","KETCHUP","KEY","KID","KING","KIWI","KNIFE","KNIGHT","LAB","LAP","LASER","LAWYER","LEAD","LEMON","LEPRECHAUN","LIFE","LIGHT","LIMOUSINE","LINE","LINK","LION","LITTER","LOCH NESS","LOCK","LOG","LONDON","LUCK","MAIL","MAMMOTH","MAPLE","MARBLE","MARCH","MASS","MATCH","MERCURY","MEXICO","MICROSCOPE","MILLIONAIRE","MINE","MINT","MISSILE","MODEL","MOLE","MOON","MOSCOW","MOUNT","MOUSE","MOUTH","MUG","NAIL","NEEDLE","NET","NEW YORK","NIGHT","NINJA","NOTE","NOVEL","NURSE","NUT","OCTOPUS","OIL","OLIVE","OLYMPUS","OPERA","ORANGE","ORGAN","PALM","PAN","PANTS","PAPER","PARACHUTE","PARK","PART","PASS","PASTE","PENGUIN","PHOENIX","PIANO","PIE","PILOT","PIN","PIPE","PIRATE","PISTOL","PIT","PITCH","PLANE","PLASTIC","PLATE","PLATYPUS","PLAY","PLOT","POINT","POISON","POLE","POLICE","POOL","PORT","POST","POUND","PRESS","PRINCESS","PUMPKIN","PUPIL","PYRAMID","QUEEN","RABBIT","RACKET","RAY","REVOLUTION","RING","ROBIN","ROBOT","ROCK","ROME","ROOT","ROSE","ROULETTE","ROUND","ROW","RULER","SATELLITE","SATURN","SCALE","SCHOOL","SCIENTIST","SCORPION","SCREEN","SCUBA DIVER","SEAL","SERVER","SHADOW","SHAKESPEARE","SHARK","SHIP","SHOE","SHOP","SHOT","SINK","SKYSCRAPER","SLIP","SLUG","SMUGGLER","SNOW","SNOWMAN","SOCK","SOLDIER","SOUL","SOUND","SPACE","SPELL","SPIDER","SPIKE","SPINE","SPOT","SPRING","SPY","SQUARE","STADIUM","STAFF","STAR","STATE","STICK","STOCK","STRAW","STREAM","STRIKE","STRING","SUB","SUIT","SUPERHERO","SWING","SWITCH","TABLE","TABLET","TAG","TAIL","TAP","TEACHER","TELESCOPE","TEMPLE","THEATER","THIEF","THUMB","TICK","TIE","TIME","TOKYO","TOOTH","TORCH","TOWER","TRACK","TRAIN","TRIANGLE","TRIP","TRUNK","TUBE","TURKEY","UNDERTAKER","UNICORN","VACUUM","VAN","VET","WAKE","WALL","WAR","WASHER","WASHINGTON","WATCH","WATER","WAVE","WEB","WELL","WHALE","WHIP","WIND","WITCH","WORM","YARD"];
var timer;
var gameState = "Inactive";

function setButtons(){
	document.getElementById("fillGrid").addEventListener("click", function() {
		fillGrid(5);
	})
	document.getElementById("fullScreen").addEventListener("click", function() {
		launchFullscreen(document.getElementById("game"));
	});
	document.getElementById("basicTimer").addEventListener("click", function() {
		startTimer(60);
	});
	document.getElementById("enterSpyMode").addEventListener("click", function() {
		enterSpyMode();
	});
	document.getElementById("exitSpyMode").addEventListener("click", function() {
		exitSpyMode();
	});
	document.getElementById("revealGrid").addEventListener("click", function() {
		revealGrid();
	});
}

function createGrid (dimension) {
	var grid = " ";
	gridHeight();
	for (x=0; x<dimension; x++){
		grid += "<div class=\"row\">";
		for (y=0; y<dimension; y++) {
			grid += "<div class=\"box\" data-position=\"" + ((x * 5) + y)  + "\"data-revealed=\"No\"> <div class=\"text\"></div> <div class=\"background\"></div> </div>"
		}
		grid += "</div>";
	}
	$("#grid").html(grid);
	$(".box").on("click", function() {
		if (gameState == "End" || gameState == "SpyMode") {
			return;
		}
		if ($(this).attr("data-revealed") == "No" && gameState == "Active") {
			if (confirm ("Reveal " + $(this).children(".text").html() + "?")){
				$(this).children(".background").css({"opacity":"1", "z-index":"2"});
				$(this).attr("data-revealed","Yes");
			}
		}
		else if ($(this).attr("data-revealed") == "Yes") {
			if($(this).children(".background").css("opacity") == 1) {
				if($(this).attr("data-identity") == "Beige") {
					$(this).children(".background").css({"opacity":".5", "z-index":"1"});
					$(this).children(".text").css({"z-index":"2"});				
				}
				else{
					$(this).children(".background").css({"opacity":".25", "z-index":"1"});
					$(this).children(".text").css({"z-index":"2"});
				}
			}
			else{
				$(this).children(".background").css({"opacity":"1", "z-index":"2"});
				$(this).children(".text").css({"z-index":"1"});			
			}
		}
	});
	$(".box").hover(
		function () {
			$(this).css({"border":"1px solid white"});
		},
		function () {
			$(this).css({"border":"1px solid black"});
		}
	);
}


/***********************************************GAME CONTROLS*************************/
function fillGrid(gridSize){
	var gridWords = [];
	var gridPositions = [];
	var gridPosition;
	for (x=0; x<gridSize*gridSize; x++){
		gridPositions.push(x);
	}
	
	if (pickRedOrBlue() == "Red") {
		$("#fillGrid").find("img").attr("src", "graphics/redGrid.png");
		var teamGoingFirst = "Red";
		var teamGoingSecond = "Blue";
	}
	else{
		$("#fillGrid").find("img").attr("src", "graphics/blueGrid.png");
		var teamGoingFirst = "Blue";
		var teamGoingSecond = "Red";
	}
	
	function fillRandomBoxes (color) {
		var gridPositionIndex = getRandomInt(0,gridPositions.length);
		$(".box[data-position="+gridPositions[gridPositionIndex]+"]").attr("data-identity", color).attr("data-revealed", "No").children(".background").css({"background-image":"url(\"graphics/" + color + " card.jpg\")","opacity":"0"});
		gridPositions.splice(gridPositionIndex, 1);			
	}
	
	//place 9 tiles for first team
	for (x=0; x<9; x++){
		fillRandomBoxes(teamGoingFirst);
	}
	
	//place 8 tiles for second team
	for (x=0; x<8; x++){
		fillRandomBoxes(teamGoingSecond);
	}
	
	//place 7 civilians
	for (x=0; x<7; x++){
		fillRandomBoxes("Beige");
	}
	
	//spy goes in remaining space
	fillRandomBoxes("Black");
	
	//place words in the tiles
	var wordsAvailable = wordBank.slice();
	$(".text").each(function() {
		var wordBankIndex = Math.floor((Math.random() * (wordsAvailable.length-1)));
		$(this).html(wordsAvailable[wordBankIndex]).parent().attr("data-revealed", "No");
		wordsAvailable.splice(wordBankIndex, 1);
		gridWords[$(this).parent().attr("data-position")] = wordsAvailable[wordBankIndex];
	});
	
	var gridData = getGridData();
	$.ajax({
		type:"POST",
		url:"privateStuff/saveGame.php",
		data:{gridData:gridData}
	}).success( function (data) {
		$("#gameId").html("Game ID: " + data);
	}).fail (function () {
		alert ("Could Not Save");
	});	
		
	gridHeight("window");
	gameState = "Active";
}

function getGridData () {
	var gridWords = "";
	var gridColors = "";
	var gridData = [];
	$(".box").each(function() {
		gridWords += $(this).children(".text").html() + ",";
		gridColors += $(this).attr("data-identity") + ",";
	});
	gridData[0] = gridWords;
	gridData[1] = gridColors;
	return gridData;
}

function launchFullscreen (element) {
	screenHeight = screen.height;
	$(element).css("height", screenHeight);
}

function startTimer (seconds) {
	clearInterval(timer);
	var timeLeft = parseInt(seconds);
	timer = setInterval(function(){
		if (timeLeft == 0){
			clearInterval(timer);
		}
		else {
			timeLeft = timeLeft - 1;
			$("#timeLeft").html(timeLeft);
		}
	}, 1000);
}

function enterSpyMode () {
	if (!(gameState == "Active" || gameState == "SpyMode")) {
		return;
	}
	$(".box").each(function () {
		if ($(this).attr("data-revealed") == "No") {
			$(this).children(".text").css({"z-index":"2"});
			$(this).children(".background").css({"z-index":"1", "opacity":".25"});
		}
		if ($(this).attr("data-revealed") == "Yes") {
			$(this).children(".text").css({"z-index":"1"});
			$(this).children(".background").css({"z-index":"2", "opacity":"1"});
		}

	});
	gameState = "SpyMode";
}

function exitSpyMode () {
	if (!(gameState == "SpyMode" || gameState == "Active")) {
		return;
	}
	$(".box").each(function () {
		if ($(this).attr("data-revealed") == "No") {
			$(this).children(".text").css({"z-index":"2"});
			$(this).children(".background").css({"z-index":"1", "opacity":"0"});
		}
		if ($(this).attr("data-revealed") == "Yes") {
			$(this).children(".text").css({"z-index":"1"});
			$(this).children(".background").css({"z-index":"2", "opacity":"1"});
		}
	});	
	gameState = "Active";
}

function revealGrid () {
	$(".box").each(function () {
		$(this).attr("data-revealed","Yes");
		$(this).children(".background").css({"opacity":".25","z-index":"1"});
		$(this).children(".text").css({"z-index":"2"});
	});
	gameState = "End";
}

function gridHeight () {
	var gridHeight = window.innerHeight;
	$("#grid").css("height", gridHeight);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function pickRedOrBlue(){
	if (Math.round(Math.random()) == 0){
		return "Red";
	}
	else{
		return "Blue";
	}
}

function redrawGrid () {

}