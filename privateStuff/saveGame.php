<?php
	require "functions.php";
	
	$conn = openDatabase();
	
	$currentTime = date("Y:m:d H:i:s", time());
	$words = trim($_POST[gridData][0], ",");
	$colors = trim($_POST[gridData][1], ",");

	$query = $conn->prepare("insert into gameInstances (momentCreated, words, colors) values (:time, :words, :colors)");
	$query->bindParam(":time", $currentTime);
	$query->bindParam(":words", $words);
	$query->bindParam(":colors", $colors);	
	$query->execute();

	$gameId = $conn->lastInsertId();
	echo $gameId;
	
?>