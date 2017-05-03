import {Component, OnInit, ViewChild} from '@angular/core';
import {Search, SearchServiceService} from '../search-service.service';
import {UploadServiceService} from '../upload-service.service';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  $searches;
  @ViewChild('fileInput') fileInput;
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
      .then((fileRef) => {
        let url = fileRef.downloadURL;
        let name = ev.target.files[0].name;
        let isGoku = false;
        let searching = true;
        let md5 = window.atob(fileRef.metadata.md5Hash);
        console.log('wtf', md5);
        let search: Search = {url, md5, name, isGoku, searching};
        this.$searches.push(search);
      });
  }

}
