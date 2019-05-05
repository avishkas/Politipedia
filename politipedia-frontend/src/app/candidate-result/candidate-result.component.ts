import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {ApiService} from "../api.service";
import {GetInputService} from '../get-input.service';
import {Router} from "@angular/router";
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css']
})
export class CandidateResultComponent implements OnInit {

  searchQuery: string;
  candidateURLName: string;
  searchResults: any;
  validEntry: boolean;

  constructor(private apiService: ApiService, private infoService: GetInfoService) {}



  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.searchQuery = sessionStorage.getItem('candidateName');

    this.apiService.getCandidates(this.searchQuery).subscribe(
    (data) => {
      this.validEntry = true;
      this.searchResults = data;
      for (let i = 0; i < this.searchResults.length; i++){
        if (this.searchResults[i].district === ''){
          this.searchResults[i].district = "Senate";
        } else{
          this.searchResults[i].district = "House of Representatives";
        }
      }
    },
      (err) => {
        this.validEntry = false;
        console.log(err);
      }
    );
  }

}


