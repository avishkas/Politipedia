import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('enterScreen', [
      transition(':enter', [style({opacity: 0}), animate('.75s', style({opacity: 1}))]),
      transition(':leave', [style( {opacity: 1}), animate('0.5s', style({opacity: 0}))])
    ]),
  ]
})
export class LandingPageComponent implements  AfterViewInit {

  isFreshSearch = true;
  staleState = false;
  constructor() { }

  ngAfterViewInit(): void {
  }

  onSearch(msg: string ) {
    this.isFreshSearch = false;
  }

  onAnimationFinished(event) {
    if (event.fromState !== 'void') {
      this.staleState = true;
      console.log(this.staleState);
    }
  }


}
