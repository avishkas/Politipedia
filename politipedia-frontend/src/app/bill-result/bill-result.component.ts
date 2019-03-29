import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-bill-result',
  templateUrl: './bill-result.component.html',
  styleUrls: ['./bill-result.component.css']
})
export class BillResultComponent implements OnInit {

  Bill: Observable<any>;
  BillName: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.BillName = sessionStorage.getItem('userInput');
    sessionStorage.setItem('userInput', null);
  }

}
