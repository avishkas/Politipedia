import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {ApiService} from "../api.service";
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-bill-result',
  templateUrl: './bill-result.component.html',
  styleUrls: ['./bill-result.component.css']
})
export class BillResultComponent implements OnInit {

  billName: string;
  searchResults: any;
  validEntry: boolean;

  constructor(private apiService: ApiService, private infoService: GetInfoService) {
  }

  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.billName = sessionStorage.getItem('billName');

    this.apiService.getBill(this.billName).subscribe(
      (data) => {
        this.validEntry = true;
        this.searchResults = this.sortByProperty(data, 'attributes.title', 1);
        console.log(data);
      },
      (err) => {
        this.validEntry = false;
        console.log(err);
      }
    );
  }


  sortByProperty(objArray, prop, direction) {
    if (arguments.length < 2) { throw new Error('ARRAY, AND OBJECT PROPERTY MINIMUM ARGUMENTS, OPTIONAL DIRECTION'); }
    if (!Array.isArray(objArray)) { throw new Error('FIRST ARGUMENT NOT AN ARRAY'); }
    const clone = objArray.slice(0);
    const direct = arguments.length > 2 ? arguments[2] : 1; // Default to ascending
    const propPath = (prop.constructor === Array) ? prop : prop.split('.');
    clone.sort(function(a, b) {
      for (const p in propPath) {
        if (a[propPath[p]] && b[propPath[p]]) {
          a = a[propPath[p]];
          b = b[propPath[p]];
        }
      }
      // convert numeric strings to integers
      a = a.match(/^\d+$/) ? +a : a;
      b = b.match(/^\d+$/) ? +b : b;
      return ( (a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0) );
    });
    return clone;
  }
}
