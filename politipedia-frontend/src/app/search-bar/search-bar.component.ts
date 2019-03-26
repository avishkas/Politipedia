import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  dropdownSelect = "Candidate";

  @Output() searchEmitter = new EventEmitter<string>();

  constructor() { }

  onSearch() {
    this.searchEmitter.emit('clicked');
  }

  selectCandidate(){
    this.dropdownSelect = "Candidate";
  }

  selectElection(){
    this.dropdownSelect = "Election";
  }

  selectSponsor(){
    this.dropdownSelect = "Sponsor";
  }

  ngOnInit() {
  }

}
