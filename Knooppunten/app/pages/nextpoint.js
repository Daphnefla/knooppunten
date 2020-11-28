import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import * as detail from './pages/detail';

let $buttonDetail = null;
let $namepoint = null;
let $namepoint1 = null;
let $namepoint2 = null;
let $namepoint3 = null;
let $namepoint4 = null;
let $namepoint5 = null;
let $namepoint6 = null;
let $namepoint7 = null;
let $namepoint8 = null;
let $namepoint9 = null;
let $allPoints = null;


export function destroy() {
  $buttonDetail = null;
  $namepoint = null;
  $namepoint1 = null;
  $namepoint2 = null;
  $namepoint3 = null;
  $namepoint4 = null;
  $namepoint5 = null;
  $namepoint6 = null;
  $namepoint7 = null;
  $namepoint8 = null;
  $namepoint9 = null;
  $allPoints = null;
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
    $namepoint5.text = list[5].value;
    $namepoint6.text = list[6].value;
    $namepoint7.text = list[7].value;
    $namepoint8.text = list[8].value;
    $namepoint9.text = list[9].value;

  } else {
    $namepoint.text = 'set item';
  }
}

export function init() {
  $buttonDetail = document.getElementById('back-button');
  $namepoint = document.getElementById('text');
  $namepoint1 = document.getElementById('text1');
  $namepoint2 = document.getElementById('text2');
  $namepoint3 = document.getElementById('text3');
  $namepoint4 = document.getElementById('text4');
  $namepoint5 = document.getElementById('text5');
  $namepoint6 = document.getElementById('text6');
  $namepoint7 = document.getElementById('text7');
  $namepoint8 = document.getElementById('text8');
  $namepoint9 = document.getElementById('text9');
  $allPoints = document.getElementsByClassName('text');
  eventsClick($allPoints);
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


function eventsClick() {
  var i;
  var outcome;
  for (i = 0; i < $allPoints.length; i++) {
    $allPoints[i].addEventListener("click", function() {
      const list = getStateItem('list');
      const index = $allPoints.indexOf(this);
      index= index-1;
        if (index > -1) {

          list = array_move(list, index, 0);
        }
    });
  }
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};
