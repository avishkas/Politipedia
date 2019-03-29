import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {GetInputService} from '../get-input.service';

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css']
})
export class CandidateResultComponent implements OnInit {

  candidateName: string;
  Candidate: Observable<any>;
  candidateURLName: string;

  constructor(private httpClient: HttpClient) {
  }


  ngOnInit() {
    this.getUserInput();
  }

  getUserInput() {
    this.candidateName = sessionStorage.getItem('userInput');
    sessionStorage.setItem('userInput', null);
    sessionStorage.setItem('candidateName' , this.candidateName);
  }

}


