import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UploadServiceService {

  uploadSearchPhoto(imgFile) {
    return firebase.storage().ref(`/searches/${imgFile.name}/`).put(imgFile);
  }
}

