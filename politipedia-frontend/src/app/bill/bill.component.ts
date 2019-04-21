import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  billId: string;
  billName: string;
  billSummary: string;
  billStatus: string;
  billIntroducedDate: string;
  billSponsor: string;
  candidateObservable: any;
  inputBill: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getBillName();
  }

  getBillName() {
    this.inputBill = sessionStorage.getItem('billName');
    this.apiService.getBill(this.inputBill).subscribe(
      (data) => {
        this.billId = data[0].id;
        this.billName = data[0].title.split(':')[0];
        this.billSummary = data[0].title.split(':')[1];
        this.billStatus = data[0].status;
        this.billIntroducedDate = data[0].introduced_date;
        this.billSponsor = data[0].sponsor_name;
        this.displayCandidates(this.billId);
      }
    );
    // this.billId = sessionStorage.getItem('bill_id');
    // this.billName = sessionStorage.getItem('bill_title').split(':')[0];
    // this.billSummary = sessionStorage.getItem('bill_title').split(':')[1];
    // this.billStatus = sessionStorage.getItem('bill_status');
    // this.billIntroducedDate = sessionStorage.getItem('bill_introduced_date');
    // this.billSponsor = sessionStorage.getItem('bill_sponsor');
  }
  displayCandidates(id: string) {
    console.log(id);
    this.candidateObservable = this.apiService.getBillCandidate(this.billId);
    this.apiService.getBillCandidate(this.billId).subscribe(
      (data) => {
        console.log(data);
  },
      (err) => {
        console.log(err);
      }
    );
  }


}
