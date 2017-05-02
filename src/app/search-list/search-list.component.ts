import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';
import {UploadServiceService} from '../upload-service.service';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  $searches;
  constructor(
    public af: AngularFire,
    public searchService: SearchServiceService,
    public uploadService: UploadServiceService) { }

  ngOnInit() {
    this.af.auth.login();
    this.$searches = this.searchService.searches;
  }

  onFileSelect(ev) {
    //commense upload!
    this.uploadService.uploadSearchPhoto(ev.target.files[0])
      .then(success => console.log('it worked??', success));
  }

}
