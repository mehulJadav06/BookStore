import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subscription, tap } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { SharedServiceService } from '../sharedService/shared-service.service';
interface options {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any[];
  public ProductType: any;
  public itemm: any;
  public flag: boolean = true;
  message: string | undefined;
  subscription: Subscription = new Subscription;
  public sortBy: options[] = [
    { value: 0, viewValue: 'a-z' },
    { value: 1, viewValue: 'z-a' },
    { value: 2, viewValue: 'price low-high' },
  ];
  public selectedValue: number = 1;
  constructor(private http: HttpClient, private router: Router, private data: SharedServiceService) {
    this.products = [];
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
    this.subscription = this.data.currentMessage.subscribe(message => {
      this.message = message
      this.http.get<any>("http://localhost:3000/Products")
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
          }
          this.sortIt();
        });
    });
  }
  addToCart(item: any) {
    this.pushProduct(item);

  }
  sortIt() {

    if (this.selectedValue == 0) {
      this.products.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    else if (this.selectedValue == 1) {
      this.products.sort((a, b) => a.Title.localeCompare(b.Title));
      this.products.reverse();
    }
    else if (this.selectedValue == 2) {
      this.products.sort((a, b) => a.Price - b.Price)
    }
  }
  pushProduct(item: any) {
    console.log("Item clicked:",item.id)
    this.http.get<any>("http://localhost:3000/cartProducts")
    .subscribe(res => {
      const sameProduct = res.find((a: any) => {
        return a.productId == item.id;
      });
      if(sameProduct){
        sameProduct.Quantity += 1
        this.itemm = sameProduct
        this.flag = false;
        this.itemm.productId = item.id;
        console.log("Item Upgraded:", this.itemm)
        this.http.put<any>("http://localhost:3000/cartProducts/" + this.itemm.id, this.itemm)
          .subscribe(result => {
          }, err => {
          });
      }
      else {
        this.itemm = JSON.parse(JSON.stringify(item));
        this.itemm.Quantity = 1
        this.itemm.productId = item.id;
        delete this.itemm['id']
        console.log("Item added:", this.itemm)
        this.http.post<any>("http://localhost:3000/cartProducts", this.itemm)
          .subscribe(result => {

          }, err => {
          });
      }
    }, err => {
      this.itemm = {}
      console.log("Something Wrong Here");
    }
    );
  }
  productClick(id:number){
    this.router.navigate(['productView/'+id]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
