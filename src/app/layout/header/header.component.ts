import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  public login:boolean = true;
  public myInterval : any;
  constructor(private http : HttpClient,private router:Router) {
    if(localStorage.getItem("token") === null){
      this.login = false;
    }
    else{
      this.login = true
    }
    
   }
  ngOnInit(): void {
    this.checker();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.checker();
  }
  checker(){
    if(localStorage.getItem("token") === null){
      this.login = false;
    }
    else{
      this.login = true
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.checker();
  }
  cart(){
    this.checker();
    if(this.login){
      this.router.navigate(['cart']);
    }
  }
  products(){
    this.checker();
    if(this.login){
      this.router.navigate(['products']);
    }
  }

}
