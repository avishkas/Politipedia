import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elections-main',
  templateUrl: './elections-main.component.html',
  styleUrls: ['./elections-main.component.css']
})
export class ElectionsMainComponent implements OnInit {

  constructor() { }

  isPresidentialCollapsed = false;
  isSenateCollapsed = false;
  isHORCollapsed = false;

  ngOnInit() {
  }

}
