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
    list: settingsStorage.getItem('list') ? JSON.parse(settingsStorage.getItem('list')).map((item) => ({
      value: item.value,
      name: item.name,
      lat: item.lat,
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
