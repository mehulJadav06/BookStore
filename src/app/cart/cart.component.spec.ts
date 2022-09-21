import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedServiceService } from '../sharedService/shared-service.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let http: HttpClient;
  let router: Router;
  let service: SharedServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Init products in cart',()=>{
    let products = [
      {
        "image": "https://material.angular.io/assets/img/examples/shiba2.jpg",
        "Description": "asdfa",
        "Title": "Doge",
        "MRP": "1000",
        "Discount": "20%",
        "Price": 801,
        "type": "Dogs",
        "Quantity": 4,
        "productId": 2,
        "id": 1
      }]
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(SharedServiceService);
    spyOn(service, "get").and.returnValue(of(products));

    component.getProducts('');
    expect(component.ProductType).toEqual('All');
    expect(component.products).toEqual(products);
    component.getProducts('Dogs');
    expect(component.ProductType).toEqual('Dogs');
  })
});
