<?php
	require "functions.php";
	$conn = openDatabase();
	
	$gameId = $_POST[gameId];
	$query = $conn->prepare("select * from gameInstances where gameId = :gameId");
	$query->bindParam(":gameId", $gameId);
	$query->execute();
	$gameData = $query->fetchAll();
	
	echo json_encode($gameData[0]);


?>