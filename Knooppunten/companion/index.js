import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';
import * as appClusterStorage from 'app-cluster-storage';

/* Save cluster storage */
function setClusterStorage(data) {
  const cluster = appClusterStorage.get('my.alphabet.cluster');
  if (cluster !== null) {
    cluster.setItem('letter', data.letter);
  } else {
    console.error('App Cluster Storage is unavailable.');
  }
}

/* Settings */
function sendSettings() {
  const settings = {
    //items: settingsStorage.getItem('items') ? JSON.parse(settingsStorage.getItem('items')).map((item) => ({
    //  letter: item.letter ? JSON.parse(item.letter).value : '',
    //  count: item.letter ? JSON.parse(item.letter).count : '',
    //  name: item.letter ? JSON.parse(item.letter).name : '',
  //  })) : [],
    //listvalue: settingsStorage.getItem('list') ? JSON.parse(settingsStorage.getItem('list')).map((item) => item.value) : [],
    //listcount: settingsStorage.getItem('list') ? JSON.parse(settingsStorage.getItem('list')).map((item) => item.count) : [],
    list: settingsStorage.getItem('list') ? JSON.parse(settingsStorage.getItem('list')).map((item) => ({
      //set the values of each item being part of the list, which is send to the device
      value: item.value,
      name: item.name,
      lan: item.lan,
      lon: item.lon,
    })) : [],
  };

  setClusterStorage(settings);

  outbox.enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));

  console.log(settings)
}

settingsStorage.addEventListener('change', sendSettings);
