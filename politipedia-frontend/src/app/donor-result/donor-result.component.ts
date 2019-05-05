import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {ApiService} from '../api.service';
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-donor-result',
  templateUrl: './donor-result.component.html',
  styleUrls: ['./donor-result.component.css']
})
export class DonorResultComponent implements OnInit {

  donorData: any;
  donorQueryName: string;
  validEntry: boolean;


  constructor(private apiService: ApiService, private infoService: GetInfoService) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.donorQueryName = sessionStorage.getItem('donorName');

    this.apiService.getDonors(this.donorQueryName).subscribe(
      (data) => {
        this.validEntry = true;
        this.donorData = this.sortByProperty(data, 'attributes.name', 1);
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
