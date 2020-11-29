import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';

import exercise from "exercise";
//import { geolocation } from "geolocation";
import { HeartRateSensor } from "heart-rate";


console.log("hallo hartslag");
let $namepoint = null;
let $buttonBack = null;
let $pijltjeRechts = null;
let hrm = null;
let $hr = null;

export function destroy() {
  console.log('destroy hartslag page');
  $namepoint = null;
  $buttonBack = null;
  $pijltjeRechts = null;
  $hr = null;
  if(hrm) hrm.stop();
  hrm = null;


  removeStateCallback();
}



function draw() {

    if (hrm && hrm.heartRate) {
      $hr.text = hrm.heartRate;
    } else{
      $hr.text = '--';
    }


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
  $buttonBack = document.getElementById('back-button');
  $pijltjeRechts = document.getElementById('rightarrow-button');
  $hr = document.getElementById('heartbeatbig');

  hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener('reading', draw);
  hrm.start();

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
