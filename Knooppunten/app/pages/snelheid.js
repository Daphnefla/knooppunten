import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import exercise from "exercise";

console.log("hallo snelheid");
let $namepoint = null;
let $speed = null;
let $buttonBack = null;
let $pijltjeLinks = null;


export function destroy() {
  console.log('destroy snelheid page');
  $namepoint = null;
  $speed = null;
  $buttonBack = null;
  $pijltjeLinks = null;
  removeStateCallback();
}



function draw() {
  exercise.start("cycling", { gps: false });

    console.log(exercise.state);
    console.log("no");
  if (exercise.state === "started") {
    console.log(exercise.stats.speed.current);
    console.log(exercise.stats.speed.max);
    $speed.text = Math.round(exercise.stats.speed.current /3.6);
    exercise.stop();
  }

  const list = getStateItem('list');
//set text in pages/detail.view
  if (list) {
    $namepoint.text = list[0].value;
  } else {
    $namepoint.text = 'set item';
  }
}



export function init() {
  console.log('init snelheid pqge');
  $namepoint = document.getElementById('textpunt');
  $speed = document.getElementById('speedbig');
  $buttonBack = document.getElementById('back-button');

  $pijltjeLinks = document.getElementById('leftarrow-button');

  $buttonBack.onclick = () => {
    switchPage('detail', true);
        console.log("test");
   };

   $pijltjeLinks.onclick = () => {
     switchPage('hartslag', true);
         console.log("naar hartslag");
    };


  setStateCallback(draw);
  draw();

}
