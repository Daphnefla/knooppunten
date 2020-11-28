import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

import exercise from "exercise";
//import { geolocation } from "geolocation";
import { HeartRateSensor } from "heart-rate";


console.log("hallo hartslag");
let $namepoint = null;
//let $heartRate = null;
let $buttonBack = null;
let $pijltjeRechts = null;


export function destroy() {
  console.log('destroy hartslag page');
  let $namepoint = null;
//  let $heartRate = null;
  let $buttonBack = null;
  let $pijltjeRechts = null;
  //const hrm = null; - doet niets
  removeStateCallback();
}



function draw() {
/*
  exercise.start("cycling", { gps: false });

  if (exercise.state === "started") {
    document.getElementById('heartbeatbig').text = exercise.stats.heartRate.current;
    console.log(exercise.stats.heartRate.current)
    exercise.stop();
  } */

    if (HeartRateSensor) {
//    hrm.stop();
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      console.log(`Current heart rate: ${hrm.heartRate}`);
      document.getElementById('heartbeatbig').text = `${hrm.heartRate}`
    //  hrm.stop();
    });
  //   hrm.stop(); -werkt wel maar lost het probleem ook niet op
    hrm.start();
  //  hrm.stop();
    }
//    hrm.stop();
    const list = getStateItem('list');
    if (list) {
      $namepoint.text = list[0].value;
    } else {
      $namepoint.text = 'set item';
    }


}



export function init() {
  console.log('init hartslag pqge');
  $namepoint = document.getElementById('textpunt');
  //$heartRate = document.getElementById('heartbeatbig');
  $buttonBack = document.getElementById('back-button');

  $pijltjeRechts = document.getElementById('rightarrow-button');

  $buttonBack.onclick = () => {
    switchPage('detail', true);
        console.log("test");
   };

   $pijltjeRechts.onclick = () => {
     switchPage('snelheid', true);
         console.log("naar snelheid");
    };


  setStateCallback(draw);
  draw();

}
