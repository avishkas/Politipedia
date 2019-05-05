import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-election-result-component',
  templateUrl: './election-result-component.component.html',
  styleUrls: ['./election-result-component.component.css']
})
export class ElectionResultComponentComponent implements OnInit {

  electionYear: string;
  searchResults: any;
  validEntry: boolean;

  constructor(private apiService: ApiService,  private infoService: GetInfoService) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.electionYear = sessionStorage.getItem('electionYear');

    this.apiService.getElection(this.electionYear).subscribe(
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
}
