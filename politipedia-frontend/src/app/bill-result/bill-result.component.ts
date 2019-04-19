import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-bill-result',
  templateUrl: './bill-result.component.html',
  styleUrls: ['./bill-result.component.css']
})
export class BillResultComponent implements OnInit {

  billName: string;
  searchResults: any;
  validEntry: boolean;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.billName = sessionStorage.getItem('billName');

    this.apiService.getBill(this.billName).subscribe(
      (data) => {
        this.validEntry = true;
        this.searchResults = data;
        console.log(data);
      },
      (err) => {
        this.validEntry = false;
        console.log(err);
      }
    );
  }
  sendName(bill: any){
    console.log(bill);
    sessionStorage.setItem('bill_title', bill.title);
    sessionStorage.setItem('bill_introduced_date', bill.introduced_date);
    sessionStorage.setItem('bill_status', bill.status);
    sessionStorage.setItem('bill_sponsor', bill.sponsor_name);
  }
}
