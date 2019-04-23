import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-donor-result',
  templateUrl: './donor-result.component.html',
  styleUrls: ['./donor-result.component.css']
})
export class DonorResultComponent implements OnInit {

  donorData: any;
  donorQueryName : string;
  validEntry: boolean;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.donorQueryName = sessionStorage.getItem('donorName');

    this.apiService.getDonors(this.donorQueryName).subscribe(
      (data) => {
        this.validEntry = true;
        this.donorData = data;
      },
      (err) => {
        this.validEntry = false;
        console.log(err);
      }
    );
  }
  sendName(name: string) {
    sessionStorage.setItem('donorName', name);
  }

}
