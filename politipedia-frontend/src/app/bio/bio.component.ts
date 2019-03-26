import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";


@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  gitCommits : Observable<any>;
  gitIssues : Observable<any>;

  justinCommits = '0';
  avishkaCommits = '0';
  ashwinCommits = '0';
  isabelCommits = '0';
  christineCommits = '0';
  andyCommits = '0';
  totalCommits = 0;

  justinIssues = 0;
  avishkaIssues = 0;
  ashwinIssues = 0;
  isabelIssues = 0;
  christineIssues = 0;
  andyIssues = 0;
  totalIssues = 0;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.getGitCommits();
    this.getGitIssues();
  }

  public getGitCommits(){
    this.gitCommits = this.httpClient.get<any>("https://api.github.com/repos/avishkas/politipedia/contributors");
    this.gitCommits.subscribe((data) => {
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
  }

  public getGitIssues(){
    this.gitIssues = this.httpClient.get<any>("https://api.github.com/repos/avishkas/politipedia/issues");
    this.gitIssues.subscribe((data) => {
      console.log(data);
      for(let i=0;i<data.length;i++){
        let currentUser = data[i]["user"]["login"];
        console.log(currentUser);
        switch(currentUser) {
          case "avishkas": {
            this.avishkaIssues++;
            this.totalIssues++;
            break;
          }
          case "JustinJChen": {
            this.justinIssues++;
            this.totalIssues++;
            break;
          }
          case "Shwinn": {
            this.ashwinIssues++;
            this.totalIssues++;
            break;
          }
          case "Yuan-Chang-UT": {
            this.andyIssues++;
            this.totalIssues++;
            break;
          }
          case "imabelli": {
            this.isabelIssues++;
            this.totalIssues++;
            break;
          }
          case "daochristine039": {
            this.christineIssues++;
            this.totalIssues++;
            break;
          }
        }
      }
    });
  }
}
