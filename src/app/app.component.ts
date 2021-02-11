// An angular project named wiki-finder to display the search based on the input from user.
// This is the main file with logic for the working.

// imports
import { Component } from '@angular/core';
import { WikiFinderService } from './wiki-finder.service';

// component definitions
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// AppComponent Class
export class AppComponent {
  // variables definition.
  searchResults: any = {};
  displayData: any = [];
  inputData: string = '';
  // boolean flags to hide and show table,loader,toast and change color of input element. 
  showTable: boolean;
  showToast: boolean;
  showLoader: boolean;
  inputColor: boolean = false;
  shaker: string;

  // object of service WikiFinderService is created
  constructor(private wikiFinderService: WikiFinderService) { }

  // search function called from the input element on press -enter key
  // search function search for the data from the api based on the binded 'inputData' variable
  search() {
    // shaker variable to bind the ngStyle property to input element.
    this.shaker = '';
    this.showTable = false;
    this.showToast = false;
    this.inputColor = false;
    this.searchResults = {};
    this.displayData = [];
    // if-condition to find if the input data is empty.
    if (this.inputData == '') {
      this.showToast = true;
      this.shaker = 'shake 0.5s';
    }
    // else condition if there is an input typed. 
    // will invoke the service funvtion getwikidata to collect the data based on the input typed.
    else {
      this.showLoader = true;
      this.inputColor = true;
      // calling getwikidata function in wiki-finder.services.
      this.wikiFinderService.getwikidata(this.inputData).subscribe((res) => {
        this.searchResults = res;
        this.searchResults = this.searchResults.query.search;
        // checking for the input validation.
        if (this.searchResults.length == 0) {
          this.showToast = true;
          this.showLoader = false;
          this.inputColor = false;
        }
        else {
          let i = 0;
          // loop to collect the data from the api and store it to an array of objects.
          while (i < 10) {
            let copyData = {
              title: this.searchResults[i].title,
              snippet: this.searchResults[i].snippet.replace(/<[^>]*>/g, '')
            };

            this.displayData.push(copyData);
            i++;
          }
          this.showLoader = false;
          this.showTable = !this.showTable;
        }
      });
    }

  }

  // function to display and hide toast.
  show() {
    this.showToast = false;
  }

  // function to change color of input element based on successful or invalid search.
  getColor() {
    return this.inputColor == true ? 'green' : 'red';
  }

  title = 'wiki-finder';
}
