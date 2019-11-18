<?php

//four var to connect to the DB
$host = "localhost";
$username = "root";
$user_pass = "usbw";
$database_in_use = "test";

//create a DB connection instance
$mysqli = new mysqli($host, $username, $user_pass, $database_in_use);

?>