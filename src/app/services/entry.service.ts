import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  selectedEntry: Entry;
  selectedOutputEntry: Entry;
  entries: Entry[];
  readonly URL_API = 'http://localhost:3000/api/registries';

  constructor( private http: HttpClient ) {
    this.selectedEntry = new Entry();
    this.selectedOutputEntry = new Entry();
  }

  getEntries() {
    return this.http.get(this.URL_API);
  }

  postEntry(entry: Entry) {
    return this.http.post(this.URL_API, entry);
  }

  putEntry(entry: Entry) {
    return this.http.put(this.URL_API + `/${entry._id}`, entry);
  }

  deleteEntry(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
