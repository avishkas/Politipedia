import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  constructor() { }
  setCandidateName(name: string) {
    sessionStorage.setItem('candidateName', name);
  }
  setBillName(name: string) {
    sessionStorage.setItem('billName', name);
  }
  setDonorName(name: string) {
    sessionStorage.setItem('donorName', name);
  }
  setElectionYear(year: string) {
    sessionStorage.setItem('electionYear', year);
  }
}
