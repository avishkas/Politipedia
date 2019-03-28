import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GetInputService} from '../get-input.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  dropdownSelect = 'Candidate';
  private inputValue = '';
  message = '';
  validInput : boolean;

  constructor(private router: Router) { }


  onSearch() {
    this.isValidInput();
  }
  navigateToResult() {
    if (this.dropdownSelect.toLowerCase() === 'sponsor') {
      this.router.navigateByUrl('/donor-result');
    } else if (this.dropdownSelect.toLowerCase() === 'election') {
      this.router.navigateByUrl('/election-result');
    } else {
      this.router.navigateByUrl('/candidate-result');
    }
  }
  isValidInput(){
    if(this.inputValue === ''){
      document.getElementById('invalidInput').setAttribute('style', 'display: block');
    }else{
      this.sendInput();
      this.navigateToResult();
    }
  }

  sendInput() {
    sessionStorage.setItem('userInput', this.inputValue);
  }

  onInput(event) {
    this.inputValue = event.target.value;
  }

  selectCandidate() {
    this.dropdownSelect = 'Candidate';
  }

  selectElection() {
    this.dropdownSelect = 'Election';
  }

  selectSponsor() {
    this.dropdownSelect = 'Sponsor';
  }

  ngOnInit() {
  }

}
