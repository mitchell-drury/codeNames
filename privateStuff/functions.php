<?php

	function openDatabase() {
		try {
			$username = "mrdwt9";
			$password = "slimester1#";
			$conn = new PDO('mysql:host=mysql.MitchellDrury.com;dbname=codenames', $username, $password);
			$conn ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$conn -> setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		}
		catch (PDOException $e) {
			echo "Connection failed: " . $e->getMessage();
		}	
		return $conn;
	}
	
?>