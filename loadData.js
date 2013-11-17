//Javascript Document


var wardObj= document.getElementById('ward');
var vdcObj = document.getElementById('vdc');
var districtObj = document.getElementById('district');

var summary = document.getElementById('summary');
var independent = document.getElementById('independent');
var parties = document.getElementById('parties');
var candidates = document.getElementById('candidates');

function dgi( a ){
	return document.getElementById( a )
}

var callAjax = function(path, callback){
    var Ajax = new XMLHttpRequest();
    Ajax.onreadystatechange = function(){
        if(Ajax.readyState == 4 && Ajax.status == 200){
            callback(Ajax.responseText);
        }   
    }
    Ajax.open("GET", path, true);
    Ajax.send();
};


var getVDC = function(district, callback){
    callAjax("getVDC.php?dist="+district, function(data){
		vdcObj.style.display = "inline";
        vdcObj.innerHTML = data;
        //alert(data);
        callback();
    });    
};  

var getWard = function(district, vdc, callback){
		callAjax("getWard.php?dist="+district+"&vdc="+vdc, function(data){
			wardObj.style.display = "inline";
			wardObj.innerHTML = data;
			callback();
		});
};


var District_change = function(district_obj){
	dgi('modal').style.display='none';
	var districtValue = district_obj.value;
	wardObj.style.display= "none";
	vdcObj.style.display = "none";
	//alert("called");
	getVDC(districtValue, function(){
		//do things
	});
};


var VDC_change = function(vdc_obj){
	dgi('modal').style.display='none';
	var vdcValue = vdc_obj.value;
	wardObj.style.display = "none";
	getWard(districtObj.value, vdcValue, function(){
			//do things
			//show information here
	});
};


var Ward_change = function(ward_obj){
	dgi('modal').style.display='none';
	var wardValue = ward_obj.value;
	var vdcValue = document.getElementById('vdc-select').value;
	var districtValue = districtObj.value;
	callAjax('getInfo.php?vdc='+vdcValue+"&dist="+districtValue+"&ward="+wardValue, function(data){
		//Show the data
		var dataObj = JSON.parse(data);
		var partiesObj = dataObj.partiesValue;
		var independentCount = dataObj.independentCount;
		var candidateObj = dataObj.candidateValue;
		var content = 'For your place: There are <a href="#" onclick="showCandidateList()"><strong>'+candidateObj.length +' Candidates.</strong></a> <strong>'+independentCount+'</strong> are independent. A total of <a href="#" onclick="showParties()"><strong>'+eval(partiesObj.length)+' parties</strong></a> are participating!';
		summary.innerHTML = content;
		//parties
		var parties_cont;
		parties_cont = "<a href='#' onclick='showSummary()'>Go back to summary</a><br><ul>";
		for (var i = partiesObj.length - 1; i >= 0; i--) {
			parties_cont += "<li>" +partiesObj[i] +"</li>";
		};
			parties_cont += "</ul>";
		parties.innerHTML = parties_cont;

		//candidates
		var candidates_cont = "<a href='#' onclick='showSummary()'>Go back to summary</a><br><ul>";
		for (var i = candidateObj.length - 1; i >= 0; i--) {
			candidates_cont += '<li onclick="showModal(\''+candidateObj[i].name+'\',\''+candidateObj[i].age+'\',\''+candidateObj[i].gender+'\',\''+candidateObj[i].party+'\')">' +candidateObj[i].name +'</li>';
		};
		candidates_cont += "</ul>"

		candidates.innerHTML = candidates_cont;

		showSummary();
		//document.getElementById('info').innerHTML = content;
		//alert(mapData);
				//undisplay loading
		//show the data

	});
	//display loading
	document.getElementById('info').innerHTML = '<center><img src="load.gif" alt=""><br>Fetching Data, Just for you!</center>';
/*	if(districtValue == "Kathmandu"){
		var dis = "Kathmandu " + wardValue + ", Nepal";
		alert(dis);
		getmaploc(dis);
	} else {
		getmaploc(districtValue + ", Nepal");
	}*/
	getmaploc(vdcValue, districtValue + ", Nepal");
	//show the map.
}

//Map function

var geocoder;
var map;
function getmaploc(arg_address, alternate_add) {
    geocoder = new google.maps.Geocoder();
    var myOptions = {
        zoom : 14 ,
        mapTypeId : google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    geocoder.geocode({
        address : arg_address
    }, function(results, status) {
        console.log(results);
        if(status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map : map,
                position : results[0].geometry.location
            });
        } else {
        	//try for alternate
        	getmaploc(alternate_add, false);
        	if(alternate_add == false){
            	alert("Geocode was not successful for the following reason: " + status);
        	}
        }

    });
}

function showCandidateList(){
	dgi('modal').style.display='none';
	dgi('info').innerHTML = candidates.innerHTML;
}

function showParties(){
	dgi('modal').style.display='none';
	dgi('info').innerHTML = parties.innerHTML;
}
function showSummary(){
	dgi('modal').style.display='none';
	dgi('info').innerHTML = summary.innerHTML;
}

function showModal(name, age, gender, party){
	a = "<span style='text-align:right;font-size:smaller;float:right;'> <a href=\"#\" onclick=\"dgi('modal').style.display='none';\">Close[&times;]</a></span><br><br>Name: "+name  +"<br>Age: "+age+"<br>Gender: "+gender+"<br>Party: "+party+"<br>";
	dgi('modal').innerHTML = a;
	dgi('modal').style.display = "block";
}

    function close(e){
                              if(e.keyCode == 27){
                                    dgi('modal').style.display = "none";
                              }
                        }