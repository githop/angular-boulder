import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FIREBASE_CONFIG} from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { SearchServiceService } from './search-service.service';
import { SearchListComponent } from './search-list/search-list.component';
import { UploadServiceService } from './upload-service.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule, MdIconModule,
  MdProgressBarModule, MdProgressSpinnerModule,
  MdToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';


@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdToolbarModule
  ],
  providers: [SearchServiceService, UploadServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
