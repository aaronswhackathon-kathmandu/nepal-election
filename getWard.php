<?php
	$dist = $_GET['dist'];
	$vdc = $_GET['vdc'];
	$con = mysql_connect('mysql.ultimatefreehost.com','u755484730_db','$$mysql12');
	if(!$con){
		die('Oops! Could not connect to database');
	}
	mysql_select_db('u755484730_db');
	$query = "SELECT DISTINCT Ward_Number FROM centers_list WHERE District='$dist' AND VDC_Municipality='$vdc'";
	$result = mysql_query($query);
	echo "Select your Ward<select onchange ='Ward_change(this);'>";
	echo "<option value='--'>--Select One--</option>";
	while($row =  mysql_fetch_array($result)){
		$a = $row['Ward_Number'];
		?>
		<option value="<?php echo $a; ?>"><?php echo $a; ?></option>
		<?php
		//echo "<option value='"+$a+"'>"+$a+"</option>";
	} 
	echo "</select>";
	mysql_close($con);
?>
