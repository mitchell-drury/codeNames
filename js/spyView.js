function setButtons() {
	$("#retrieveGrid").on("click", function() {
		var gameId = $("#enterGameId input:text").val();
		$.ajax({
			type:"POST",
			url:"privateStuff/retrieveGame.php",
			data:{gameId:gameId},
			dataType:"json"
		}).success( function (data) {
			createGrid(5);
			var words = data.words.split(",");
			var colors = data.colors.split(",");
			$(".box").each(function(){
				$(this).children(".text").html(words[$(this).attr("data-position")]).css({"z-index":"2"});
				$(this).children(".background").css({"background-image":"url(\"graphics/" + colors[$(this).attr("data-position")] + " card.jpg\")","opacity":".25","z-index":"1"});
				$(this).attr("data-identity", colors[$(this).attr("data-position")]);

			});
		}).fail (function () {
			alert ("Could Not Save");
		});	
	});
		
	$("#revealGrid").on("click", function() {
		$(".box").each(function () {
			if ($(this).attr("data-revealed") == "Yes") {
				$(this).children(".background").css({"opacity":"1","z-index":"2"});
				$(this).children(".text").css({"z-index":"1"});
			}
			else{
				$(this).children(".background").css({"opacity":".25","z-index":"1"});
				$(this).children(".text").css({"z-index":"2"});
			}
		});
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
		if ($(this).attr("data-revealed") == "No") {
			$(this).children(".background").css({"opacity":"1", "z-index":"2"});
			$(this).attr("data-revealed","Yes");			
		}
		else {
			if($(this).children(".background").css("opacity") == 1) {
				$(this).children(".background").css({"opacity":".25", "z-index":"1"});
				$(this).children(".text").css({"z-index":"2"});
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


function gridHeight () {
	var gridHeight = window.innerHeight;
	$("#grid").css("height", gridHeight);
}
