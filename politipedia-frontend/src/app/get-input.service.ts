import  {Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
export class GetInputService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  private data;

  constructor() {
  }

  setData(data){
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

  // sendMessage(message: string) {
  //   this.messageSource.next(message);
  //   console.log(this.messageSource.value);
  // }
}


