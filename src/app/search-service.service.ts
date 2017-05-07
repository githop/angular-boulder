import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

export class Search {
  name: string;
  url: string;
  isGoku: boolean;
  searching: boolean;
}

@Injectable()
export class SearchServiceService {
  private $searches: FirebaseListObservable<Search[]>;
  constructor(private db: AngularFireDatabase) {
    this.$searches = db.list('/searches');
  }

  get searches() {
    //to add new searches to the head of the list.
    return this.$searches.map(arr => arr.reverse());
  }


}
