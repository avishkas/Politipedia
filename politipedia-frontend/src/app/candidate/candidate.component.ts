import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {GetInfoService} from "../get-info.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidateName: string;
  candidateTwitter: string;
  Candidate: Observable<any>;
  state: string;
  party: string;
  district: string;
  candidateBillPosition: any;
  imageURL: string;

  contributorData: any;

  constructor(private APIService: ApiService, private router: Router, private infoService: GetInfoService) { }

  ngOnInit() {
    this.getCandidateName();
    this.getImage();
    this.getCandidateInfo();
    this.getBillPosition();
    this.getContributors();
    this.getCandidateTwitter();
  }

  getCandidateTwitter() {
    this.APIService.getTwitter(this.candidateName).subscribe(
      (data) => {
        console.log(data);
        this.candidateTwitter = data[0];
      }
    );
  }

  getImage() {
    this.APIService.getImage(this.candidateName).subscribe(
      (data) => {
        console.log(data);
        this.imageURL = data[0];
      }
    );
  }

  getCandidateName() {
    this.candidateName = sessionStorage.getItem('candidateName');
    console.log(this.candidateName);
  }

  getCandidateInfo() {
    console.log(this.candidateName);
    this.APIService.getCandidates(this.candidateName).subscribe((data) => {
      console.log(data);
      this.state = data[0].state;
      this.party = data[0].party;

      if(data[0].district === "")
        this.district = "Senate";
      else
        this.district = data[0].district;

    });
  }

  getBillPosition() {
    this.APIService.getCandidateBills(this.candidateName).subscribe(
      (data) => {
        console.log(data);
        this.candidateBillPosition = data;
      },
      (err) => {
        console.log(err);
      });
  }

  getContributors(){
    this.APIService.getContributorsGivenCandidate(this.candidateName).subscribe(
      (data) => {
        this.contributorData = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
