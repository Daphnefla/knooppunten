import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import * as detail from './pages/detail';

let $buttonDetail = null;
let $list = null;
let $allPoints = null;


export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;
  $list = null;
  $allPoints = null;

  //$buttonReplace = null;
}



function draw() {
  const list = getStateItem('list');



  $list.delegate = {
    getTileInfo: (index) => {
      return {
        type: "my-pool",
        value: (list && list.length) ? list[index].name : 'Configure in settings',
        index: index
      };
    },
    configureTile: (tile, info) => {
      if (info.type == "my-pool") {
        tile.getElementById("text").text = info.value;
        let touch = tile.getElementById("touch");
           console.log(`touched: ${info.index}`);
      }
    }
  };

  $list.length = (list && list.length) || 1;

  }

export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('back-button');
  $list = document.getElementById("myList");
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

        if (index > -1) {
          console.log("index" + index + "was clicked");
          list = array_move(list, index, 0);
        }
    });
  }

}

function array_move(arr, old_index, new_index) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};
