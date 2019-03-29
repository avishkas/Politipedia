import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-topdonors',
  templateUrl: './topdonors.component.html',
  styleUrls: ['./topdonors.component.css']
})


export class TopdonorsComponent implements OnInit {

  @Input() listDonor: string[];

  constructor() { }

  ngOnInit() {
  }

}
