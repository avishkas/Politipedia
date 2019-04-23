import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  donorName: string;
  contributions: any;

  constructor(private APIService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getDonorName();
    this.getDonorInfo();
  }

  getDonorName() {
    this.donorName = sessionStorage.getItem('donorName');
  }
  getDonorInfo() {
    this.APIService.getContribution(this.donorName).subscribe(
      (data) => {
        console.log(data);
        this.contributions = data;
      }
    );
  }
  sendCandidateInformation(name: string) {
    sessionStorage.setItem('candidateName', name);
    this.router.navigate(['/candidate']);
  }

}
