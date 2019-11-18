<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
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
                
                padding: 10px 0px 0px 300px;
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

            table {
            	font-family: "Lato", sans-serif;
            	border-collapse: separate;
 				width: 100%;
 				text-align: left;
 				border-radius: : 4px 4px 0 0;
 				border-spacing: 0;
 				font-size: 14px;
 				color: #314659;
 				padding: 21px 10px 50px;
            }
            td, th {
            	border-bottom: 1px solid #ddd;
            	padding: 10px;
            	color: rgba(0,0,0,0.65);
            }
            
            tr:hover {
            	background-color: #ebf7ff; 
            	transition: 0.3s;
            }
            th {
			 	/*padding-top: 12px;
			 	padding-bottom: 12px;*/
			 	text-align: left;
			 	background-color: #FAFAFA;
			 	color: rgba(0,0,0,0.85);
			}
			::selection {
    			color: #fff;
    			background: #1890ff;
			}
			table.fixed {table-layout:fixed; width:7000px;}/*Setting the table width is important!*/
			table.fixed td:nth-of-type(10) {overflow-x: scroll;}/*Hide text outside the cell.*/
			table.fixed td:nth-of-type(10) {width:40px;}/*Setting the width of column 3.*/
			.selected {
			    background-color: #ebf7ff; 
			    color: rgba(0,0,0,0.65);
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
			<?php

				include "db_connect.php";
				function assignVarifExist($key){
					if (isset($_GET[$key])) {$assignedKey = $_GET[$key];}
					else {$assignedKey = '';}
					return $assignedKey;
				}

				$cellline = assignVarifExist("cellline");
				$chrom = assignVarifExist("chromosomes");
				$id1 = assignVarifExist("id1");
				$lowerRegion = assignVarifExist("lowerRegion");
				$upperRegion = assignVarifExist("upperRegion");
				$id2 = assignVarifExist("id2");
				$position = assignVarifExist("position");
				$range = assignVarifExist("range");
				$downstream = assignVarifExist("downstream");
				$upstream = assignVarifExist("upstream");

				function gen_header() {
						include "db_connect.php";
						$sql = "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'test' AND `TABLE_NAME` = 'b_cell_chr19_phase3_anno'";
						$result = $mysqli->query($sql);
						//header row
						$header = [];
						$before_INFO = True;
						echo "<tr id='header'>"; 
						while($row =$result->fetch_assoc()) {
							if($row['COLUMN_NAME'] != 'KEY_ID'){ 
								array_push($header, $row['COLUMN_NAME']);
								if($row['COLUMN_NAME'] == 'VAR_ID') {echo "<th><input type ='checkbox' id='selectAll' onclick ='selectOrUnselectAll()'>" . $row['COLUMN_NAME'] . "</th>";}
								else {echo "<th>" . $row['COLUMN_NAME'] . "</th>";}
					    		
					    	}
						}
						echo "</tr>";
					    return $header;
				}
				function gen_data($sql){
					include "db_connect.php";
					$header = gen_header();
					$header_len = count($header);
					
					$result = $mysqli->query($sql);
					while($row =$result->fetch_assoc()) {
							echo "<tr name = 'row'>";
							for($i=0; $i<$header_len; $i++){
								if($i==0){
									echo "<td><input type ='checkbox' name = 'acs' onclick ='checkSelectAll()'>" . $row[$header[$i]] . "</td>";
								} else {echo "<td>" . $row[$header[$i]] . "</td>";}
							}
					    	echo "</tr>";
						}
				}

				function gen_table($tablename, $sql){
					echo "<table class='fixed' id='$tablename'>";
					gen_data($sql);
					echo "</table>";
				}

				if ($id1 == '') {
					if ($downstream == '' and $upstream != '') {echo "<h2> Show all snips with $cellline - $chrom - $id2 - $position - $range" . "bp upstream </h2>";
						$lowerRegion = $position;
						$upperRegion = $position+$range;
						$sql = "SELECT * FROM $cellline WHERE CHROM = $chrom and $lowerRegion <= POS and  POS <= $upperRegion";
						$tablename= "$cellline"."_"."$chrom". "_". "$id2"."_"."$lowerRegion"."_"."$upperRegion";
						gen_table($tablename, $sql);
					}elseif ($upstream == '' and $downstream != '') {echo "<h2> Show all snips with $cellline - $chrom - $id2 - $position - $range" . "bp downstream </h2>";
						$lowerRegion = $position-$range;
						$upperRegion = $position;
						$sql = "SELECT * FROM $cellline WHERE CHROM = $chrom and $lowerRegion <= POS and  POS <= $upperRegion";
						$tablename= "$cellline"."_"."$chrom". "_". "$id2"."_"."$lowerRegion"."_"."$upperRegion";
						gen_table($tablename, $sql);
					}elseif ($upstream == '' and $downstream == '') {echo "<h2> Show all snips with $cellline - $chrom - $id2 - $position  </h2>";
						$lowerRegion = $position;
						$upperRegion = $position;
						$sql = "SELECT * FROM $cellline WHERE CHROM = $chrom and $lowerRegion <= POS and  POS <= $upperRegion";
						$tablename= "$cellline"."_"."$chrom". "_". "$id2"."_"."$lowerRegion"."_"."$upperRegion";
						gen_table($tablename, $sql);
					} else {
					echo "<h2> Show all snips with $cellline - $chrom - $id2 - $position - $range" . "bp upstream and downstream </h2>";
					$lowerRegion = $position-$range;
					$upperRegion = $position+$range;
					$sql = "SELECT * FROM $cellline WHERE CHROM = $chrom and $lowerRegion <= POS and  POS <= $upperRegion";
					$tablename= "$cellline"."_"."$chrom". "_". "$id2"."_"."$lowerRegion"."_"."$upperRegion";
					gen_table($tablename, $sql);
					}

				} elseif($id2 == '') {
					echo "<h2> Show all snips with $cellline - $chrom - $id1 - $lowerRegion to $upperRegion </h2>";
					
					$sql = "SELECT * FROM $cellline WHERE CHROM = $chrom and $lowerRegion <= POS and  POS <= $upperRegion";
					// SELECT * FROM b_cell_chr19_phase3_anno WHERE CHROM = 19 and 388376 <= POS <= 388480
					$tablename= "$cellline"."_"."$chrom". "_". "$id1"."_"."$lowerRegion"."_"."$upperRegion";
					gen_table($tablename, $sql);
				}

			?>
			<button class='export'>Export to csv </button>
			<!-- <button onclick="doCsv('<?php echo $tablename ?>')">Export to csv </button> -->
		</div>

		<?php $mysqli->close(); ?>

		<!-- <script type="text/javascript" src= "exportAsCSV.js"></script> -->
		<script type="text/javascript" src= "checkbox.js"></script>
		<script type="text/javascript" src= "downloadSelectedRows.js"></script>
</body>
</html>
 
