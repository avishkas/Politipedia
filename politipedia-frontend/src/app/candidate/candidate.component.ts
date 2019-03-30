import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
  listElections: string[];
  listBills: string[];
  state: string;
  gender: string;
  party: string;
  stateRank: string;
  govtrackID: string;

  information = {
      first_name: 'John',
      last_name: 'Doe',
      in_senate: false,
      state: 'Temp',
      gender: 'Temp',
      party: 'Temp',
      fec_candidate_id: '123456',
      state_rank: 'Temp',
      govtrack_id: '123456',
      donorList: [
        'Donor 1',
        'Donor 2',
        'Donor 3'
      ]
    };

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCandidateName();
    this.getCandidateInfo();
    this.parseJSON();
  }
  getCandidateName() {
    this.candidateName = sessionStorage.getItem('candidateName');
  }
  getCandidateInfo() {
    this.candidateURLName = this.candidateName.split(' ').join('+');
    this.Candidate = this.httpClient.get<any>('/candidate/?candidate-name=' + this.candidateURLName);
    this.Candidate.subscribe((data) => {
      console.log(data);
    });
  }
  parseJSON() {
    this.state = this.information.state;
    this.gender = this.information.gender;
    this.party = this.information.party;
    this.stateRank = this.information.state_rank;
    this.govtrackID = this.information.govtrack_id;
    this.listDonors = this.information.donorList;
  }

}
