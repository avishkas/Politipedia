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
    this.gitObservables.subscribe((data) => {
      for(let i=0;i<data.length;i++){
        //Switch cases for each user
        switch(data[i]["login"]) {
          case "avishkas": {
            this.avishkaCommits = data[i]["contributions"];
            break;
          }
          case "JustinJChen": {
            this.justinCommits = data[i]["contributions"];
            break;
          }
          case "Shwinn": {
            this.ashwinCommits = data[i]["contributions"];
            break;
          }
          case "Yuan-Chang-UT": {
            this.andyCommits = data[i]["contributions"];
            break;
          }
          case "imabelli": {
            this.isabelCommits = data[i]["contributions"];
            break;
          }
          case "daochristine039": {
            this.christineCommits = data[i]["contributions"];
            break;
          }
        }
      }
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
