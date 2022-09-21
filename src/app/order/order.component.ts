import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../sharedService/shared-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public products :any[] ;
  constructor(private http : HttpClient,private router:Router, private data: SharedServiceService) {
    this.products = []
   }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['login']);
    }
    this.initProduct();
  }
  initProduct(){
    this.http.get<any>("http://localhost:3000/OrderedProducts")
        .subscribe(res => {
          this.products = res;});
  }
  productClick(item:any){

  }
  cancel(item:any){

  }
}
