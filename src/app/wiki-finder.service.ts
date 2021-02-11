import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiFinderService {

  constructor(private httpclient:HttpClient) { }

  getwikidata(inputData) {
    return  this.httpclient.get('https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&origin=*&srsearch=' + inputData);
  }
}
