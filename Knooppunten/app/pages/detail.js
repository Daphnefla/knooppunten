import document from 'document';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

let $button = null;
let $namepoint = null;


function doSomething() {
  console.log('hallo detail');
}

function draw() {
  const list = getStateItem('list');
  // const listOneItem= getStateItem('list')[0].letter;

//set text in pages/detail.view
  if (list) {
    $namepoint.text = list[0].value;
  } else {
    $namepoint.text = 'set item';
  }
}

export function destroy() {
  console.log('destroy detail page');
  $button = null;
  removeStateCallback();
}

export function init() {
  console.log('init detail page');
  $namepoint = document.getElementById('text');
  $button = document.getElementById('back-button');
  $button.onclick = () => {
    destroy();
    document.history.back();
  };

  setStateCallback(draw);
  draw();
}

import { geolocation } from "geolocation";
geolocation.getCurrentPosition(function(position) {
   console.log(position.coords.latitude + ", " + position.coords.longitude);
})
