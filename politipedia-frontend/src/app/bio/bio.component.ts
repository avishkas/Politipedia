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
  totalCommitObservables : Observable<any>;
  output : object;

  justinCommits = '0';
  avishkaCommits = '0';
  ashwinCommits = '0';
  isabelCommits = '0';
  christineCommits = '0';
  andyCommits = '0';
  totalCommits = 0;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.gitObservables = this.httpClient.get<any>("https://api.github.com/repos/avishkas/politipedia/contributors");
    // this.gitObservables.subscribe((data) => console.log(data));
    this.gitObservables.subscribe((data) => {
      this.justinCommits = data[1]["contributions"];
      this.avishkaCommits = data[0]["contributions"];
      this.ashwinCommits = data[2]["contributions"];
      this.isabelCommits = data[3]["contributions"];
      this.totalCommits = eval(this.justinCommits) + eval(this.avishkaCommits) + eval(this.ashwinCommits) + eval(this.isabelCommits) + eval(this.christineCommits);
    });


    //   this.totalCommitObservables = this.httpClient.get<any>("https://api.github.com/repos/avishkas/politipedia/stats/commit_activity");
    //
    //   this.totalCommitObservables.subscribe((data) => {
    //     for(let i=0; data.length; i++){
    //       this.totalCommits += eval(data[i]["total"]);
    //     }
    //   })
    // }
  }
}
