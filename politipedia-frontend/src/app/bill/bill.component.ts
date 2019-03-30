import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  billName: string;

  constructor() { }

  ngOnInit() {
    this.getBillName();
  }

  getBillName(){
    this.billName = sessionStorage.getItem('billName');
  }

}
