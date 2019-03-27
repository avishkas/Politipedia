import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  dropdownSelect = 'Candidate';

  @Output() searchEmitter = new EventEmitter<string>();

  constructor(private router: Router) { }

  onSearch() {
    if (this.dropdownSelect.toLowerCase() === 'sponsor') {
      this.router.navigateByUrl('/donor-result');
    } else if (this.dropdownSelect.toLowerCase() === 'election') {
      this.router.navigateByUrl('/election-result-component');
    } else {
      this.router.navigateByUrl('/' + this.dropdownSelect.toLowerCase() + '-result');
    }
  }

  selectCandidate(){
    this.dropdownSelect = 'Candidate';
  }

  selectElection(){
    this.dropdownSelect = 'Election';
  }

  selectSponsor(){
    this.dropdownSelect = 'Sponsor';
  }

  ngOnInit() {
  }

}
