import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidateName: string;
  candidateTwitter: string;
  candidateURLName: string;
  Candidate: Observable<any>;
  listDonors: string[];
  state: string;
  party: string;
  district: string;
  candidateBillPosition: any;
  imageURL: string;

  constructor(private httpClient: HttpClient, private APIService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getCandidateName();
    this.getCandidateInfo();
    this.getBillPosition();
    this.getImage();
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
  }

  getCandidateInfo() {
    this.candidateURLName = this.candidateName.split(' ').join('+');
    this.Candidate = this.httpClient.get<any>('/candidate/?candidate-name=' + this.candidateURLName);
    this.Candidate.subscribe((data) => {
      console.log(data);
      this.state = data[0].state;
      this.party = data[0].party;
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
  sendBillInformation(name: string) {
    // this.APIService.getBill(name).subscribe(
    //   (data) => {
    //     console.log(data[0]);
    //     sessionStorage.setItem('bill_title', data[0].title);
    //     sessionStorage.setItem('bill_introduced_date', data[0].introduced_date);
    //     sessionStorage.setItem('bill_status', data[0].status);
    //     sessionStorage.setItem('bill_sponsor', data[0].sponsor_name);
    //   }
    // );
    sessionStorage.setItem('billName', name);
  }

}
