import {Component, OnInit} from '@angular/core';
import {Search, SearchServiceService} from '../search-service.service';
import {UploadServiceService} from '../upload-service.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-search-list',
  styles: [`
    
    :host {
      text-align: center;
    }
    
    .searches {
      margin: 1.5em 0;
    }
    
    .searching md-progress-spinner {
      margin: 0 auto;
    }
    
    .fileTarget {
      opacity: 0;
      position: fixed; 
      top:0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      transition: opacity 0.33s ease-in-out;
    }
    
    .fileHover {
      /*z-index: 1;*/
      background-color: #ff6d00; 
      opacity: 0.7;
    }
    
  `],
  template: `    
    <div><h1 class="big-font">Android Sixteen Vision</h1></div>
    <div class="fileTarget" [ngClass]="{'fileHover': hovering }"
         (drop)="onDrop($event)"
         (dragover)="onDragover($event)"
         (dragenter)="onDragenter($event)"
         (dragleave)="onDragleave($event)">
    </div>
    
    <div fxLayout="row" fxLayoutAlign="center">
      <div fxFlex="90" fxFlex.gt-sm="40">
        <div class="searches" *ngFor="let search of $searches | async">
          <md-toolbar color="accent"><h1>{{search.name}}</h1></md-toolbar>
          <md-card>
            <img md-card-image [src]="search.url">
            <md-card-actions>
              
              <ng-container *ngIf="search.searching; else searched">
                <div class="searching">
                  <md-progress-spinner color="warn" mode="indeterminate"></md-progress-spinner>
                </div>
              </ng-container>
              <ng-template #searched>
                <ng-container *ngIf="search.isGoku; else notGoku">
                  <h1 class="big-font">Goku!</h1>
                </ng-container>
                <ng-template #notGoku>
                  <h1 class="big-font">Not Goku!</h1>
                </ng-template>
              </ng-template>
            </md-card-actions>
          </md-card>
        </div>
      </div>
    </div>
  `
})
export class SearchListComponent implements OnInit {
  $searches;
  hovering: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    public searchService: SearchServiceService,
    public uploadService: UploadServiceService) { }

  ngOnInit() {
    this.afAuth.auth.signInAnonymously();
    this.$searches = this.searchService.searches;
  }

  handleFileUpload(file) {
    //commense upload!
    return this.uploadService.uploadSearchPhoto(file)
      .then((fileRef) => {
        let url = fileRef.downloadURL;
        let name = file.name;
        let isGoku = false;
        let searching = true;
        let search: Search = {url, name, isGoku, searching};
        return this.$searches.push(search);
      });
  }

  onDrop(ev) {
    ev.preventDefault();
    this.hovering = false;
    let file = ev.dataTransfer.files[0];

    if (file && /(png|jpe?g|gif)/.test(file.type)) {
      this.handleFileUpload(file)
        .catch(e => console.log('upload err'));
    }
  }

  onDragover(ev) {
    ev.preventDefault();
    // console.log('drag over!');
    this.hovering = true;
  }

  onDragenter(ev) {
    // console.log('drag enter')
    //add a class
    this.hovering = true;
  }

  onDragleave(ev) {
    // console.log('drag leave!')
    //remove a class
    this.hovering = false;
  }

}
