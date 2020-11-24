import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import { exercise } from "exercise";
import { geolocation } from "geolocation";

let $namepoint = null;
let $volgendepunt = null;
let $kmToNext = null;
let $speed = null;
let $buttonSnelheid = null;
let watchID = null;

//geolocation
let watchID = geolocation.watchPosition(locationSuccess, locationError);


export function destroy() {
  console.log('destroy detail page');
  //geolocation.clearWatch(watchID);
      console.log('hallo detail');
  $namepoint = null;
  $volgendepunt = null;
  $kmToNext = null;
  $speed = null;
  $buttonSnelheid = null;
  watchID = null;

  removeStateCallback();
}

function locationSuccess(position) {
    const list = getStateItem('list');
    const lat1 = list[0].lat;
    const lon1 = list[0].lon;
    const lat2 = position.coords.latitude;
    const lon2 = position.coords.longitude;
    const unit = "K";
    const dist = distance(lat1, lon1, lat2, lon2, unit);
    $kmToNext.text = dist;
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

function distance(lat1, lon1, lat2, lon2, unit) {
  	if ((lat1 == lat2) && (lon1 == lon2)) {
  		return 0;
  	}
  	else {
  		var radlat1 = Math.PI * lat1/180;
  		var radlat2 = Math.PI * lat2/180;
  		var theta = lon1-lon2;
  		var radtheta = Math.PI * theta/180;
  		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  		if (dist > 1) {
  			dist = 1;
  		}
  		dist = Math.acos(dist);
  		dist = dist * 180/Math.PI;
  		dist = dist * 60 * 1.1515;
  		if (unit=="K") { dist = dist * 1.609344 }
  		if (unit=="N") { dist = dist * 0.8684 }
      dist = Math.round(dist);
  		return dist;
  	}
}


function draw() {

  exercise.start("cycling", { gps: false });
    console.log(exercise.state);
    console.log("no");
  if (exercise.state === "started") {
    console.log(exercise.stats.speed.current);
    console.log(exercise.stats.speed.max);
//    $speedrn = exercise.stats.speed.current;
    $speed.text = Math.round(exercise.stats.speed.current /3.6) + " km/h";
    exercise.stop();
  }

  console.log(exercise.state);

  const list = getStateItem('list');

  geolocation.watchPosition(locationSuccess, locationError);
  // const listOneItem= getStateItem('list')[0].letter;

//set text in pages/detail.view
  if (list) {
    $namepoint.text = list[0].value;
    $volgendepunt.text = list[1].value;
    $kmToNext.text = watchID;
  } else {
    $namepoint.text = 'set item';
  }
}


export function init() {
  console.log('init detail page');
    console.log('check tzee');
  $namepoint = document.getElementById('textpunt');
  $volgendepunt = document.getElementById('textvolgende');
  $kmToNext = document.getElementById('kmToNext');
  $speed = document.getElementById('speed');
  $buttonSnelheid = document.getElementById('snelheid-button');
  watchID = null;
  console.log('hier');
  $buttonSnelheid.onclick = () => {

    switchPage('snelheid', true);
        console.log("test");
  };

  setStateCallback(draw);
  draw();
}



/*
let mijnNummer = document.getElementById("text");
let arc = document.getElementById("vooruitgang");
let bijschrift = document.getElementById("bijschrift");
let circle = document.getElementById("bigCircle");
function animaion(){
   mijnNummer.classList.remove("onzichtbaar");
   bijschrift.classList.remove("onzichtbaar");
   arc.classList.add("play");
}
circle.addEventListener("click", animation); */
