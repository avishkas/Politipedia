import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css']
})
export class CandidateResultComponent implements OnInit {

  Candidate : Observable<any>;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.getCandidate();
  }
  getCandidate(){
    this.Candidate = this.httpClient.get<any>("/candidate/?candidate-name=Lamar+Alexander");
    this.Candidate.subscribe((data) => {
      console.log(data);
    });
  }
}


