<?php
	$dist = $_GET['dist'];
	$con = mysql_connect('mysql.ultimatefreehost.com','u755484730_db','$$mysql12');
	if(!$con){
		die('Oops! Could not connect to database');
	}
	mysql_select_db('u755484730_db');
	$query = "SELECT DISTINCT VDC_Municipality FROM centers_list WHERE District='$dist'";
	$result = mysql_query($query);
	echo "Select your municipality/VDC<select onchange ='VDC_change(this);' id='vdc-select'>";
	echo "<option value='--'>--Select One--</option>";
	while($row =  mysql_fetch_array($result)){
		$a = $row['VDC_Municipality'];
		?>
		<option value="<?php echo $a; ?>"><?php echo $a; ?></option>
		<?php
		//echo "<option value='"+$a+"'>"+$a+"</option>";
	} 
	echo "</select>";
	mysql_close($con);
?>
