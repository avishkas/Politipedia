import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter<string>();

  constructor() { }

  onSearch() {
    this.searchEmitter.emit('clicked');
  }

  ngOnInit() {
  }

}
