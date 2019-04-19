import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  billName: string;
  billSummary: string;
  billStatus: string;
  billIntroducedDate: string;
  billSponsor: string;

  constructor() { }

  ngOnInit() {
    this.getBillName();
  }

  getBillName(){
    this.billName = sessionStorage.getItem('bill_title').split(':')[0];
    this.billSummary = sessionStorage.getItem('bill_title').split(':')[1];
    this.billStatus = sessionStorage.getItem('bill_status');
    this.billIntroducedDate = sessionStorage.getItem('bill_introduced_date');
    this.billSponsor = sessionStorage.getItem('bill_sponsor');
  }

}
