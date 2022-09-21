import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  public id:number =0;
  public product: any;
  public reviews:any;
  public ratings:number = 0;
  public map = new Map<string, string>();
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>("http://localhost:3000/Products")
      .subscribe(res => {
        this.product = res.find((a: any) => {
          return a.id == this.id;
        })
      });
    this.http.get<any>("http://localhost:3000/ReviewProduct")
      .subscribe(res => {
        this.reviews = res.filter((a:any)=> a.productId == this.id)
        this.calculateRating();
      }            
      );
  }
  calculateRating(){
    let summ = 0;
    this.reviews.forEach((element: { Ratings: number,id:number }) => {
      summ += element.Ratings;
      let msg = element.Ratings < 3 ?"Bad":(element.Ratings>4?"Awesome":"Good");
      this.map.set(String(element.id), msg); 
      console.log(this.map.get(element.id+''))
    });
    this.ratings = summ/this.reviews.length
  }

}
