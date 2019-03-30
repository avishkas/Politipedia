import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCandidates(candidateName: string){
    return this.http.get('/candidate', {params: {'candidate-name': candidateName}});
  }

  getDonors(donorName: string){
    return this.http.get('/donor', {params: {'donor-name': donorName}});
  }

  getElection(electionYear: string){
    return this.http.get('/elections/', {params: {'election-year': electionYear}});
  }
  getBill(billName: string){
    return this.http.get('/bills/', {params: {'bill-name': billName}});
  }

}