import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

import exercise from "exercise";
import { geolocation } from "geolocation";


let $namepoint = null;
let $snelheid = null;


function draw() {
  exercise.start("cycling", { gps: false });
    console.log(exercise.state);
    console.log("no");
  if (exercise.state === "started") {
    console.log(exercise.stats.speed.current);
    console.log(exercise.stats.speed.max);
//    $speedrn = exercise.stats.speed.current;
    $snelheid.text = Math.round(exercise.stats.speed.current /3.6) + "km/h";
    exercise.stop();
  }

    console.log(exercise.state);
  const list = getStateItem('list');
  // const listOneItem= getStateItem('list')[0].letter;
//  $speedrn.text =
//set text in pages/detail.view
  if (list) {
    $namepoint.text = list[0].value;
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
  $snelheid = document.getElementById('speed');

  setStateCallback(draw);
  draw();
}
