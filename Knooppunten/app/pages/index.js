import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

let $buttonDetail = null;
let $namepoint = null;
let $namepoint1 = null;
let $namepoint2 = null;
let $namepoint3 = null;
let $namepoint4 = null;

//let $buttonReplace = null;

export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;
  $namepoint = null;
  $namepoint1 = null;
  $namepoint2 = null;
  $namepoint3 = null;
  $namepoint4 = null;
  //$buttonReplace = null;
}

function draw() {
  const list = getStateItem('list');
//set text in pages/index.view
  if (list) {
    $namepoint.text = list[0].value;
    $namepoint1.text = list[1].value;
    $namepoint2.text = list[2].value;
    $namepoint3.text = list[3].value;
    $namepoint4.text = list[4].value;
  } else {
    $namepoint.text = 'set item';
  }
}

export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('detail-button');
  $namepoint = document.getElementById('text');
  $namepoint1 = document.getElementById('text1');
  $namepoint2 = document.getElementById('text2');
  $namepoint3 = document.getElementById('text3');
  $namepoint4 = document.getElementById('text4');
  //$buttonReplace = document.getElementById('replace-button');

  $buttonDetail.onclick = () => {
    switchPage('detail', true);
  };
  //$buttonReplace.onclick = () => {
  //  switchPage('replace');
  //};

  setStateCallback(draw);
  draw();
}
