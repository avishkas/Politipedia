import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {GetInputService} from '../get-input.service';

@Component({
  selector: 'app-candidate-result',
  templateUrl: './candidate-result.component.html',
  styleUrls: ['./candidate-result.component.css'],
  providers: [GetInputService]
})
export class CandidateResultComponent implements OnInit {

  candidateName: string;

  Candidate: Observable<any>;

  constructor(private httpClient: HttpClient, private GetInputService: GetInputService) { }

  ngOnInit() {
    this.GetInputService.currentMessage.subscribe(message => this.candidateName = message);
    console.log(this.candidateName);
    // this.getCandidate();
  }
  // getCandidate() {
  //   this.Candidate = this.httpClient.get<any>("/candidate/?candidate-name=Lamar+Alexander");
  //   this.Candidate.subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}


