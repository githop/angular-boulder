const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const gcs = require('@google-cloud/storage')({keyFilename: 'angular-boulder-firebase-adminsdk-hdbtn-78a2c09326.json'});
const searchesRef = admin.database().ref('/searches');

exports.onImageUpload = functions.storage.object().onChange(event => {
  console.log('file change!', event);
  let object = event.data;
  if (object.resourceState === 'not_exists') {
    return console.log('This is a deletion event.');
  }
  // const file = gcs.bucket(object.bucket).file(object.name);
  // const action = 'read';
  // const expires = '05-12-2049';
  // const name = object.name.split('/').pop();
  // return file.getSignedUrl({action, expires})
  //   .then(signedUrls => {
  //     return signedUrls[0];
  //   })
  //   .then(url => createSearchFromUpload(name, url));
});


function createSearchFromUpload(name, url) {
  return searchesRef.push({url, name});
}
