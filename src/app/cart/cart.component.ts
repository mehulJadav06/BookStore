import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../sharedService/shared-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy {
  public products :any[] ;
  message: string | undefined;
  placeOrderDisabled: boolean = false;
  subscription: Subscription = new Subscription;
  public ProductType: any;
  constructor(private http : HttpClient,private router:Router, private data: SharedServiceService) { 
    this.products = [];
  }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['login']);
    }
    this.initProduct();
    console.log(this.placeOrderDisabled);
  }
  initProduct(){
    this.subscription = this.data.currentMessage.subscribe(message => {
      this.message = message
      this.getProducts(message);
      });
  }
  getProducts(message:string){
    this.data.get("cartProducts")
        .subscribe(res => {
          this.products = res;
          this.ProductType = message == '' ? 'All' : message;
          if (message != '' && res.length > 0) {
            let p: any[] = []
            let productType: any = this.ProductType;
            res.forEach(function (value: typeof res[0]) {
              if (value.type.toLowerCase().includes(message.toLowerCase()) || message.toLowerCase().includes(value.type.toLowerCase())) {
                p.push(value)
                productType = value.type;
              }
            }
            );
            this.products = p;
            this.ProductType = productType;
            this.placeOrderDisabled = p.length ==0 ? true : false;
            console.log(this.placeOrderDisabled)
          }
        });
  }
  remove(id:any){
      this.data.delete("cartProducts",id).subscribe(data => {
        this.initProduct();
      });
  }
  placeOrder(){
    console.log(this.products);
  }
  ngOnDestroy(): void {
    this.products.forEach(item => {
      this.http.put("http://localhost:3000/cartProducts/"+item.id,item).subscribe(data => {
        
      });
    });
    
  }
  productClick(id:number){
    this.router.navigate(['productView/'+id]);
  }
}
