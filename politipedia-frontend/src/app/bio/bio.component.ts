import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";


@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  gitObservables : Observable<any>;
  output : object;

  justinCommits = '?';
  avishkaCommits = '?';
  ashwinCommits = '?';
  isabelCommits = '0';
  christineCommits = '0';
  andyCommits = '0';

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.gitObservables = this.httpClient.get<any>("https://api.github.com/repos/avishkas/politipedia/contributors");
    // this.gitObservables.subscribe((data) => console.log(data));
    this.gitObservables.subscribe((data) => {
      this.justinCommits = data[1]["contributions"];
      this.avishkaCommits = data[0]["contributions"];
      this.ashwinCommits = data[2]["contributions"];
    });
  }

}
