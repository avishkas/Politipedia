import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  donorName: string;

  constructor() { }

  ngOnInit() {
    this.getDonorName();
  }
  getDonorName() {
    this.donorName = sessionStorage.getItem('donorName');
  }

}
