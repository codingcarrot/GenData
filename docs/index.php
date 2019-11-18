<!DOCTYPE html>
<html>
<?php include "db_connect.php"; ?>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
            body {
            margin: 0;
            font-family: "Lato", sans-serif;
            }


            .menu-title {
                -fx-font-size: 40;
                -fx-color: orange;
            }

            .menu-button {
                -fx-pref-width: 200;
                -fx-pref-height: 40;
                -fx-background-color: orange;
                -fx-background-radius: 8px;
                -fx-font-size: 20;
            }

            .screen-background {
                -fx-background-color: white;
                -fx-background-image: url("ui/comp3111/background3111.jpg");
                -fx-background-repeat: stretch;
            }

            .confirm-Message {
                -fx-font-size: 15;
            }

            .small-button {
                -fx-pref-width: 180;
                -fx-pref-height: 25;
                -fx-background-color: orange;
                -fx-background-radius: 10px;
                -fx-font-size: 80;
            }

            .button {
                -fx-font-size: 16;
                -fx-background-color: rgba(0,0,0,0);
                /*-fx-background-radius: 10px;*/
                -fx-text-fill: #FFF;
            }

            .s-button {
                -fx-pref-width: 100;
                -fx-pref-height: 20;
                -fx-background-color: orange;
                -fx-background-radius: 8px;
                -fx-font-size: 15;
            }

            .content {
                
                padding: 10px 0px 0px 270px;
                display: block;
            }

            h1, p {
                color: #9e9e9e;
            }
            .sidenav {
                height: 100%;
                width: 250px;
                position: fixed;
                z-index: 1;
                top: 0;
                left: 0;
                background-image: linear-gradient(to bottom right, #aaf0c7, #90d1e8);
                padding-top: 60px;
            }

                .sidenav a {
                    padding: 8px 8px 8px 68px;
                    text-decoration: none;
                    font-size: 25px;
                    color: #FFF;
                    display: block;
                }

                    .sidenav a:hover {
                        color: #e6e6e6;
                    }

            .links {
                padding-top: 50%;
            }
    </style>
    <meta charset="utf-8" />
</head>

<body>

<!--     {% extends 'base.html' %}
    {% block content %}
    {% if user.is_authenticated %} -->

        <div id="mySidenav" class="sidenav">
            <div class="links">
                <a href="index.php">&#5171; home</a>
                <a href="import.php">&#5171; import</a>
                <a href="search.php">&#5171; search</a>
                <a href="contact.html">&#5171; contact us</a>
                <!-- <a href="{% url 'login' %}">&#5171; logout</a> -->
            </div>
        </div>
        <div class="content" id="index">
            <h1 style="font-size: 100px; margin: 10px 0 0 0; font-weight: lighter;">home</h1>
            <hr>
            <h1>Celllines available on this database:</h1>
            <p>
            	<?php

					

					// include "search_all_jokes.php";
					if ($mysqli->connect_errno) {
					    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
					}
					//echo $mysqli->host_info . "<br>";
					$sql = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'test'";
					$result = $mysqli->query($sql);

					if ($result->num_rows > 0) {
						// output data of each row
						while($row = $result->fetch_assoc()) {
							echo $row["TABLE_NAME"] . "<br>";
						}
						
					} else {
						echo "0 results";
					}
				?></p>
            
        </div>

<!--     {% else %}
        <p>You are not logged in</p>
        <a href="{% url 'login' %}">login</a>
    {% endif %}
    {% endblock %} -->
    

  

  


<!-- <form action="search_keyword.php">
  Please enter a keyword:<br>
  <input type="text" name="keyword"><br>
  <input type="submit" value="Submit">
</form>
<hr>
<form action="add_joke.php">
  Please enter a new joke:<br>
  <input type="text" name="newjoke"><br>
  Please enter your answer to your joke:<br>
  <input type="text" name="newanswer"><br>
  <input type="submit" value="Submit">
</form> -->

<?php 
// include "search_keyword.php";

$mysqli->close();

// $mysqli = new mysqli("127.0.0.1", "user", "password", "database", 3306);
// if ($mysqli->connect_errno) {
//     echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
// }
// echo $mysqli->host_info . "\n";
?>
</body>
</html>
<script></script>  
