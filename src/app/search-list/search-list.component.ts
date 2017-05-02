import { Component, OnInit } from '@angular/core';
import {SearchServiceService} from '../search-service.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  $searches;
  constructor(public searchService: SearchServiceService) { }

  ngOnInit() {
    this.$searches = this.searchService.searches;
  }

  onFileSelect(ev) {
    //commense upload!
  }

}
