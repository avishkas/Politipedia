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
  validEntry: boolean;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.BillName = sessionStorage.getItem('billName');

    this.apiService.getBill(this.BillName).subscribe(
      (data) => {
        this.validEntry = true;
        this.searchResults = data;
      },
      (err) => {
        this.validEntry = false;
        console.log(err);
      }
    );
  }
  sendName(name: string){
    sessionStorage.setItem('billName', name);
  }
}
