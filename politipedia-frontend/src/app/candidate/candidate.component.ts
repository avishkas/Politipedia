import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidateName: string;
  candidateURLName: string;
  Candidate: Observable<any>;
  listDonors: string[];
  state: string;
  party: string;
  district: string;
  candidateBillPosition: any;
  imageURL: string;

  constructor(private httpClient: HttpClient, private APIService: ApiService) { }

  ngOnInit() {
    this.getCandidateName();
    this.getCandidateInfo();
    this.getBillPosition();
    this.getImage();
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

}
