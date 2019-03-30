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
    if (this.dropdownSelect.toLowerCase() === 'donor') {
      this.router.navigateByUrl('/donor-result');
    } else if (this.dropdownSelect.toLowerCase() === 'election') {
      this.router.navigateByUrl('/election-result');
    } else if( this.dropdownSelect.toLowerCase() === 'candidate') {
      this.router.navigateByUrl('/candidate-result');
    } else {
      this.router.navigateByUrl('/bill-result');
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
    if(this.dropdownSelect === 'Candidate') {
      sessionStorage.setItem('candidateName', this.inputValue);
    }
    if(this.dropdownSelect === 'Election') {
      sessionStorage.setItem('electionYear', this.inputValue);
    }
    if(this.dropdownSelect === 'Donor') {
      sessionStorage.setItem('donorName', this.inputValue);
    }
    else{
      sessionStorage.setItem('billName', this.inputValue);
    }
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

  selectDonor() {
    this.dropdownSelect = 'Donor';
  }

  selectBill(){
    this.dropdownSelect = 'Bill';
  }
  ngOnInit() {
  }

}
