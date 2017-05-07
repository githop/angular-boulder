const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const gcs = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision')();
const searchesRef = admin.database().ref('/searches');
//handle storage uploads
exports.onImageUpload = functions.storage.object().onChange(event => {
  let object = event.data;
  let name = object.name;
  let searchName = name.split('/').pop();
  if (object.resourceState === 'not_exists') {
    return
  }

  const query = admin.database().ref('/searches')
    .orderByChild('name')
    .equalTo(searchName);

  const file = gcs.bucket(object.bucket).file(name);
  let isGoku = false;

  return vision.detectSimilar(file)
    .then((results) => {
      const webDetection = results[1].responses[0].webDetection;

      if (webDetection.webEntities.length) {
        webDetection.webEntities.forEach((webEntity) => {
          if (/goku/i.test(webEntity.description)) {
            console.info('GOKU FOUND!');
            isGoku = true;
          }
        });
      }
    })
    .then(() => query.once('child_added'))
    .then(snap => {
      return searchesRef
        .child(snap.key)
        .update({searching: false, isGoku});
    });

});
