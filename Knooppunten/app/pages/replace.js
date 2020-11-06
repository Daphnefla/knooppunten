import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

let $button = null;
let $items = null;


//get list array
function draw() {
  const list = getStateItem('list');
  // const listOneItem= getStateItem('list')[0].letter;

//set text in pages/replace.view
  if (list) {
    $items.text = list[2].value;
  } else {
    $items.text = 'set item';
  }
}

export function destroy() {
  $button = null;
  $items = null;
  removeStateCallback();
}

export function init() {
  //gets the text element from pages/replace.view
  $items = document.getElementById('letter');

  $button = document.getElementById('back-button');
  $button.onclick = () => {
    switchPage('index');
  };

  setStateCallback(draw);
  draw();
}
