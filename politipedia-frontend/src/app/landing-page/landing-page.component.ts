import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('searchState', [
      state('hasSearched', style({opacity: 0})),
      state('freshSearch', style({opacity: 1})),
      transition('freshSearch => hasSearched', animate('0.5s'))
    ]),
    trigger('searchMove', [
      state('hasSearched', style({transform: 'translateY()'})),
      state('freshSearch', style({})),
      transition('freshSearch => hasSearched', animate('0.5s'))
    ])
  ]
})
export class LandingPageComponent implements OnInit {

  isFreshSearch = 'freshSearch';
  freshSearchFormatActive = true;


  constructor() { }

  ngOnInit() {
  }

  onSearch(msg: string ) {
    console.log(msg);
    this.isFreshSearch = 'hasSearched';
  }

  onAnimationFinished(event) {
    console.log(event);
    if (event.fromState !== 'void') {
      this.freshSearchFormatActive = false;
    }
  }


}
