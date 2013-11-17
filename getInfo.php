<?php
$vdc= $_GET['vdc'];
$dist= $_GET['dist'];
$ward= $_GET['ward'];
$con = mysql_connect('mysql.ultimatefreehost.com','u755484730_db','$$mysql12');
	if(!$con){
		die('Oops! Could not connect to database');
	}
mysql_select_db('u755484730_db');
$json= "map_Data";
if($dist == 'Kathmandu'){
	$json = "Kathmandu $ward";
	//$json = file_get_contents("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Kathmandu "+$ward+"&sensor=false&key=AddYourOwnKeyHere");
} else {
	$json = "$dist";
	//$json = file_get_contents("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+$dist+"&sensor=false&key=AddYourOwnKeyHere");
}
//get constituency from above three things

//then using dist and constituency, get candidates list.
$query1 = "SELECT * FROM centers_list WHERE District='$dist' AND VDC_Municipality='$vdc' AND Ward_Number=$ward;";
$res1 = mysql_query($query1);
$row1 = mysql_fetch_array($res1);
$constituency = $row1['Constituency'];
$query = "SELECT * FROM candidates_list WHERE District='$dist' AND Constituency=$constituency ;";
//if possible if clicked in candidates. Show only his info. Like from how many places did he get up :)

$res = mysql_query($query);
$count = 0;
$uniqueParties = array();
$independentCount = 0;
while($row= mysql_fetch_array($res)){
	$candidate[$count]['name'] = $row['CandidateName'];
	$candidate[$count]['gender'] = $row['Gender'];
	$candidate[$count]['age'] = $row['Age'];
	$candidate[$count]['party'] = $row['PartyName'];
	if(!in_array($row['PartyName'], $uniqueParties)){
		if(trim($row['PartyName']) != 'स्वतन्त्र'){
			$uniqueParties[] = $row['PartyName'];
		}
	}
	if(trim($row['PartyName']) == 'स्वतन्त्र'){
		$independentCount++;
	}
	$count++;
}
mysql_close($con);
$data['candidateValue']= $candidate;
$data['partiesValue'] = $uniqueParties;
$data['independentCount'] = $independentCount;
echo json_encode($data);
//Assume only one person from a party can get up (उठ्नु) from one place only.