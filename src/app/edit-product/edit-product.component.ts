import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public EditProductForm !:FormGroup;
  public id:any;
  public product:any;
  constructor(private formBuilder : FormBuilder,private http: HttpClient,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("isAdmin")!="true"){
      this.router.navigate(['login']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>("http://localhost:3000/Products")
    .subscribe(res=>{
      this.product = res.find((a:any)=>{
        return a.id == this.id;
      })
      console.log("Product:",this.product);
      this.EditProductForm = this.formBuilder.group({
        Title : [this.product.Title,Validators.required],
        Price : [this.product.Price,Validators.required],
        MRP : [this.product.MRP,Validators.required],
        Description : [this.product.Description,Validators.required]
      })
    });
  }
  edit(){
    this.product.Price = this.EditProductForm.value.Price;
    this.product.Title = this.EditProductForm.value.Title;
    this.product.MRP = this.EditProductForm.value.MRP;
    this.product.Description = this.EditProductForm.value.Description;
    this.http.put<any>("http://localhost:3000/Products/"+this.id,this.product)
    .subscribe(res=>{
      this.router.navigate(['product']);
    });
    
  }
  cancel(){
    this.router.navigate(['product']);
  }

}
