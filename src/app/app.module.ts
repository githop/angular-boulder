import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FIREBASE_CONFIG} from '../environments/firebase.config';
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import { SearchServiceService } from './search-service.service';
import { SearchListComponent } from './search-list/search-list.component';
import { UploadServiceService } from './upload-service.service';

const FirebaseAuthConfig = {
  provider: AuthProviders.Anonymous,
  method: AuthMethods.Anonymous
};

@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, FirebaseAuthConfig)
  ],
  providers: [SearchServiceService, UploadServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
