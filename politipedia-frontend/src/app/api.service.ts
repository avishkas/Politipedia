import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCandidates(candidateName: string) {
    return this.http.get('/candidate', {params: {'candidate-name': candidateName}});
  }

  getDonors(donorName: string) {
    return this.http.get('/donor', {params: {'donor-name': donorName}});
  }

  getElection(electionYear: string) {
    return this.http.get('/elections/', {params: {'election-year': electionYear}});
  }
  getBill(billName: string) {
    return this.http.get('/bills/', {params: {'bill-name': billName}});
  }
  getCandidateBills(candidateName: string) {
    return this.http.get('/candidateBill/', {params: {'candidate-name': candidateName}});
  }
  getBillCandidate(billId: string) {
    return this.http.get('/billCandidate', {params: {'bill-id': billId}});
  }
  getImage(name: string) {
    return this.http.get('/getImage/', {params: {'candidate-name': name}});
  }
  getTwitter(name: string) {
    return this.http.get('/getTwitter/', {params: {'query-string': name}});
  }
  getContribution(name: string) {
    return this.http.get('/contribution/',{params: {'donor-name': name}});
  }
  getContributorsGivenCandidate(name: string){
    return this.http.get('/contributorsGivenCandidate', {params: {'candidate-name': name}});
  }
}
