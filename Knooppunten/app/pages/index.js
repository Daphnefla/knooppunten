import document from 'document';
import { switchPage } from '../navigation';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import { gettext } from "i18n";



let $buttonDetail = null;
let $list = null;



//let $buttonReplace = null;

export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;
  $list = null;
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
        touch.addEventListener("click", evt => {
          console.log(`touched: ${info.index}`);
        });
      }
    }
  };

  $list.length = (list && list.length) || 1;

}




export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('detail-button');
  $list = document.getElementById("myList");

  $buttonDetail.onclick = () => {
    switchPage('detail', true);
  };


  setStateCallback(draw);
  draw();
}
