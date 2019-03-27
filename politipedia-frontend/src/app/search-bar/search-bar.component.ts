import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GetInputService} from '../get-input.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [GetInputService]
})
export class SearchBarComponent implements OnInit {

  dropdownSelect = 'Candidate';
  private inputValue = '';

  constructor(private router: Router, private GetInputService: GetInputService) { }

  onSearch() {
    this.sendMessage();
    if (this.dropdownSelect.toLowerCase() === 'sponsor') {
      this.router.navigateByUrl('/donor-result');
    } else if (this.dropdownSelect.toLowerCase() === 'election') {
      this.router.navigateByUrl('/election-result-component');
    } else {
      this.router.navigateByUrl('/candidate-result');
    }
  }

  sendMessage() {
    this.GetInputService.sendMessage(this.inputValue);
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
