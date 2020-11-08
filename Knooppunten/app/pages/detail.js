import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';


let $namepoint = null;
let $volgendepunt = null;


function doSomething() {
  console.log('hallo detail');
}

function draw() {
  const list = getStateItem('list');
  // const listOneItem= getStateItem('list')[0].letter;

//set text in pages/detail.view
  if (list) {
    $namepoint.text = list[0].value;
    $volgendepunt.text = list[1].value;
  } else {
    $namepoint.text = 'set item';
  }
}

export function destroy() {
  console.log('destroy detail page');

  $namepoint = null;
  $volgendepunt = null;
  removeStateCallback();
}

export function init() {
  console.log('init detail page');
  $namepoint = document.getElementById('textpunt');
  $volgendepunt = document.getElementById('textvolgende');


  setStateCallback(draw);
  draw();
}

import { geolocation } from "geolocation";
geolocation.getCurrentPosition(function(position) {
   console.log(position.coords.latitude + ", " + position.coords.longitude);
})


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
