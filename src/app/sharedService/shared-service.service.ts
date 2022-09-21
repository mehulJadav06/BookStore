import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http : HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  get(name:string){
    return this.http.get<any>("http://localhost:3000/"+name);
  }

  delete(name:string,id:number){
    return this.http.delete("http://localhost:3000/"+name+"/"+id);
  }

}
