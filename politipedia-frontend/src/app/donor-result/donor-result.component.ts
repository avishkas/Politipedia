import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-donor-result',
  templateUrl: './donor-result.component.html',
  styleUrls: ['./donor-result.component.css']
})
export class DonorResultComponent implements OnInit {

  Donor: Observable<any>;
  donorName : string;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.donorName = sessionStorage.getItem('userInput');
    sessionStorage.setItem('userInput', null);
  }

}
