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

  BillName: string;
  searchResults: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.BillName = sessionStorage.getItem('userInput');
    sessionStorage.setItem('userInput', null);

    this.apiService.getBill(this.BillName).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sendName(name: string){
    sessionStorage.setItem('billName', name);
  }
}
