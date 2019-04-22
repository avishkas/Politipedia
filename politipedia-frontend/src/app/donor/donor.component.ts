import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  donorName: string;
  imageURL: string;
  contributionAmount: string;

  constructor(private APIService: ApiService) {}

  ngOnInit() {
    this.getDonorName();
    this.getImage();
    this.getDonorInfo();
  }
  getImage() {
    this.APIService.getImage(this.donorName).subscribe(
      (data) => {
        console.log(data);
        this.imageURL = data[0];
      }
    );
  }
  getDonorName() {
    this.donorName = sessionStorage.getItem('donorName');
  }
  getDonorInfo() {
    this.APIService.getDonors(this.donorName).subscribe(
      (data) => {
        console.log(data);
        this.contributionAmount = data[0].contribution;
      }
    );
  }

}
