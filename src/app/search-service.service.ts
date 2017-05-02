import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

class Search {
  name: string;
  url: string;
  isGoku: boolean;
  searching: boolean;
}

@Injectable()
export class SearchServiceService {
  private $searches: FirebaseListObservable<Search[]>;
  constructor(private fb: AngularFire) {
    this.$searches = fb.database.list('/searches');
  }

  get searches() {
    return this.$searches;
  }

  addSearch(tmpSearch) {
    this.$searches.push(tmpSearch);
  }

}
