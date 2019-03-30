import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-election-result-component',
  templateUrl: './election-result-component.component.html',
  styleUrls: ['./election-result-component.component.css']
})
export class ElectionResultComponentComponent implements OnInit {

  electionYear: string;
  searchResults: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.electionYear = sessionStorage.getItem('electionYear');

    this.apiService.getElection(this.electionYear).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sendName(name: string) {
    sessionStorage.setItem('candidateName', name);
  }

}
