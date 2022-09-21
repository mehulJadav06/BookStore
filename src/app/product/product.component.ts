import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../sharedService/shared-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Title', 'Price', 'MRP','Edit'];
  public dataSource = new MatTableDataSource();
  public products:any;
  public filterValue:string='';
  public ds :any;
  message: string | undefined;
  subscription: Subscription = new Subscription;
  public ProductType: any;
  constructor(private http : HttpClient,private router:Router, private data: SharedServiceService) { }

  ngOnInit(): void {
    if(localStorage.getItem("isAdmin")!="true"){
      this.router.navigate(['login'])
    }
     this.http.get<any>("http://localhost:3000/Products")
    .subscribe(res=>{
      this.dataSource = res;
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      this.http.get<any>("https://localhost:44343/api/products").subscribe(res=>{
        console.log("Its working :",res);});
    });
  }

  applyFilter(event: Event) { 
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  
  edit(element:any){
    this.router.navigate(['/edit/'+element.id])
  }
  delete(element:any){
    this.http.delete("http://localhost:3000/Products/"+element.id).subscribe(data => {
      this.initAgain();
    });
  
  }
  addProduct(){
    let product={
      "image": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "Description": "temp",
      "Title": "temp",
      "MRP": "1222",
      "Discount": "10%",
      "Price": 1111,
      "type": "temp"
    }
    this.http.post<any>("http://localhost:3000/Products",product).subscribe(data=>{
      this.initAgain();
    });
  }
  initAgain(){
    this.http.get<any>("http://localhost:3000/Products")
    .subscribe(res=>{
      this.ds = res;
      this.dataSource = res;
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    });
  }
}
