<!DOCTYPE html>
<html>
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
            button[type=submit] {
                border: visible;
                color: rgba(0,0,0,0.25);
                background-color:#f5f5f5;
                border-color: #d9d9d9;
                border-radius: 5px;
                padding: 0 20px;
                text-align: center;
                display: inline-block;
                font-size: 15px;
                margin: -6px -18px;
                line-height: 1.5;
                position: relative;
                font-weight: 400;
                height: 32px; 
                
            }
            .btn-div{
                margin: auto 0;
                width: 20px; 
                padding: 7% 0 0 41.5%;
            }
    </style>
    <meta charset="utf-8" />
</head>
<body>
<?php include "db_connect.php";?>
    <!-- {% extends 'base.html' %}
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
        <div class="content" id="search">
            <h1 style="font-size: 100px; margin: 10px 0 0 0; font-weight: lighter;">search</h1>
            <hr>
            <form action="search_snips.php">
                <p>cellline*:
                <select name="cellline"> 
                <?php 
                    // echo "<p>cellline*:<input type='text' name='cellline'></p>";
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
                            echo "<option value='" . $row["TABLE_NAME"] ."'>" . $row["TABLE_NAME"] . "</option>";
                        }
                        
                    } else {
                        echo "0 results";
                    }
                ?></select></p>

                <!-- <p>cellline*:<input type="text" name="cellline"></p> -->
                
                <p>chromosomes*:
                <select name="chromosomes"> 
                    <option value="1">1</option><option value="1">2</option>
                    <option value="3">3</option><option value="1">4</option>
                    <option value="5">5</option><option value="1">6</option>
                    <option value="7">7</option><option value="1">8</option>
                    <option value="9">9</option><option value="1">10</option>
                    <option value="11">11</option><option value="12">12</option>
                    <option value="13">13</option><option value="14">14</option>
                    <option value="15">15</option><option value="16">16</option>
                    <option value="17">17</option><option value="18">18</option>
                    <option value="19">19</option><option value="20">20</option>
                    <option value="21">21</option><option value="22">22</option>
                </select></p>
                
                <p>(You must fill in one of the following fields.)</p>
                <div id="field1">
                    <p>id: <input type="text" id="field1id" name="id1"></p>
                    <p>region/position: <input type="text" id="field1lwregion" name="lowerRegion"> - <input type="text" id="field1upregion" name="upperRegion"></p>        
                </div>
                
                <p>(or)</p>
                
                <div id="field2">
                    <p>id: <input type="text" id="field2id" name="id2"></p>
                    <p>position: <input type="text" id="field2position" name="position"></p>
                    <p>range: <input type="text" id="field2range" name="range">bp 
                    <input type="checkbox" id="downstream" name="downstream">
                    <label for="downstream">downstream</label> 
                    <input type="checkbox" id="upstream" name="upstream">
                    <label for="upstream">upstream</label></p>
                </div>
                <div><button type="submit">submit</div>
            </form>
        </div>

   <!--  {% else %}
        <p>You are not logged in</p>
        <a href="{% url 'login' %}">login</a>
    {% endif %}
    {% endblock %} -->
    
<?php 
$mysqli->close();
?>
  
</body>
</html>
<script>
        
            //field1 ids
            var dis1id = document.getElementById("field1id");
            var dis1regionlw = document.getElementById("field1lwregion");
            var dis1regionup = document.getElementById("field1upregion");
            //field2 ids
            var dis2id = document.getElementById("field2id");
            var dis2pos = document.getElementById("field2position");
            var dis2range = document.getElementById("field2range");
            var dis2downstream = document.getElementById("downstream");
            var dis2upstream = document.getElementById("upstream");
            //initial setup
            dis1id.disabled = false;
            dis1regionlw.disabled = false;
            dis1regionup.disabled = false;
            dis2id.disabled = false;
            dis2pos.disabled = false;
            dis2range.disabled = false;
            dis2downstream.disabled = false;
            dis2upstream.disabled = false;
            
            document.addEventListener("DOMContentLoaded", function(event) { 
            
            
            //if some value is entered in field 1 then field 2 is diabled
            
            dis1id.onchange = function(){
                if (this.value.length > 0 && dis1regionlw.value.length == 0 && dis1regionup.value.length == 0){
                    dis2id.disabled = true;
                    dis2pos.disabled = true;
                    dis2range.disabled = true;
                    dis2downstream.disabled = true;
                    dis2upstream.disabled = true;

                }   else if (this.value.length == 0 && dis1regionlw.value.length == 0 && dis1regionup.value.length == 0){
                            //enable field 2 if field 1 is completely empty
                            dis2id.disabled = false;
                            dis2pos.disabled = false;
                            dis2range.disabled = false; 
                            dis2downstream.disabled = false;
                            dis2upstream.disabled = false;  
                    }   else {}
            }
            dis1regionlw.onchange = function(){
                if (this.value.length > 0 && dis1id.value.length == 0 && dis1regionup.value.length == 0){
                    dis2id.disabled = true;
                    dis2pos.disabled = true;
                    dis2range.disabled = true;
                    dis2downstream.disabled = true;
                    dis2upstream.disabled = true;
                }   else if (this.value.length == 0 && dis1id.value.length == 0 && dis1regionup.value.length == 0){
                            dis2id.disabled = false;
                            dis2pos.disabled = false;
                            dis2range.disabled = false; 
                            dis2downstream.disabled = false;
                            dis2upstream.disabled = false;
                    }   else {}
            }
            dis1regionup.onchange = function(){
                if (this.value.length > 0 && dis1id.value.length == 0 && dis1regionlw.value.length == 0){
                    dis2id.disabled = true;
                    dis2pos.disabled = true;
                    dis2range.disabled = true;
                    dis2downstream.disabled = true;
                    dis2upstream.disabled = true;
                }   else if (this.value.length == 0 && dis1id.value.length == 0 && dis1regionlw.value.length == 0){
                            dis2id.disabled = false;
                            dis2pos.disabled = false;
                            dis2range.disabled = false; 
                            dis2downstream.disabled = false;
                            dis2upstream.disabled = false;
                    }   else {}
            }
    
    
            //if some value is entered in field 2 then field 1 is diabled
            
            
            dis2id.onchange = function(){
                if (this.value.length > 0 && dis2pos.value.length == 0 && dis2range.value.length == 0){
                    //disable field 1
                    dis1id.disabled = true;
                    dis1regionlw.disabled = true;
                    dis1regionup.disabled = true;
                }   else if (this.value.length == 0 && dis2pos.value.length == 0 && dis2range.value.length == 0){
                        //enable field 1
                        dis1id.disabled = false;
                        dis1regionlw.disabled = false;
                        dis1regionup.disabled = false;
                    }   else {}
            }
            dis2pos.onchange = function(){
                if (this.value.length > 0 && dis2id.value.length == 0 && dis2range.value.length == 0){
                    //disable field 1
                    dis1id.disabled = true;
                    dis1regionlw.disabled = true;
                    dis1regionup.disabled = true;
                }   else if (this.value.length == 0 && dis2id.value.length == 0 && dis2range.value.length == 0){
                        //enable field 1
                        dis1id.disabled = false;
                        dis1regionlw.disabled = false;
                        dis1regionup.disabled = false;
                    }   else {}
            }
            dis2range.onchange = function(){
                if (this.value.length > 0 && dis2id.value.length == 0 && dis2pos.value.length == 0){
                    //disable field 1
                    dis1id.disabled = true;
                    dis1regionlw.disabled = true;
                    dis1regionup.disabled = true;
                }   else if (this.value.length == 0 && dis2id.value.length == 0 && dis2pos.value.length == 0){
                        //enable field 1
                        dis1id.disabled = false;
                        dis1regionlw.disabled = false;
                        dis1regionup.disabled = false;
                    }   else {}
            }
        });
    
    
</script>  
