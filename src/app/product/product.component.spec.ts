import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedServiceService } from '../sharedService/shared-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let http: HttpClient;
  let router: Router;
  let service: SharedServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProductComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    //component = new ProductComponent(http,router,data);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit("first test", () => {
    expect(component.filterValue).toBe("");
  });

  fit("test edit funtion", () => {
    expect(component.edit({ 'name': 'fadf' })).toBe();
  })

  fit("init again component", () => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(SharedServiceService);
    spyOn(service, "get").and.returnValue(of([{ "name": "Tatvasoft" }]));

    component.initAgain();
    expect(component.ds).toEqual([{ "name": "Tatvasoft" }]);
  })

  fit("filter value ", () => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    spyOn(component, "applyFilter");
    let searchBox = fixture.debugElement.query(By.css('#apFilter'));
    const event = new KeyboardEvent('keyup', {
      bubbles: true, cancelable: true, shiftKey: false
    });
    searchBox.triggerEventHandler('keyup', event);
    fixture.detectChanges();
    expect(component.applyFilter).toHaveBeenCalled();
  })
});
