import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-election-result-component',
  templateUrl: './election-result-component.component.html',
  styleUrls: ['./election-result-component.component.css']
})
export class ElectionResultComponentComponent implements OnInit {

  electionName : string;
  constructor() { }

  ngOnInit() {
    this.getUserInput();
  }
  getUserInput() {
    this.electionName = sessionStorage.getItem('userInput');
    sessionStorage.setItem('userInput', null);
  }

}
