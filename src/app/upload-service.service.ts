import { Injectable } from '@angular/core';
import 'firebase/storage';
import {FirebaseApp} from 'angularfire2';


@Injectable()
export class UploadServiceService {
  constructor(private fb: FirebaseApp) {}

  uploadSearchPhoto(imgFile) {
    return this.fb.storage().ref(`/searches/${imgFile.name}/`).put(imgFile);
  }
}

