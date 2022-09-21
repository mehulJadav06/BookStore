import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SharedServiceService } from '../sharedService/shared-service.service';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let http : HttpClient;
  let router: Router;
  let data : SharedServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule,RouterTestingModule],
      declarations: [ ProductComponent],
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

  fit("first test",()=>{
    expect(component.filterValue).toBe("");
  });

  fit("test edit funtion",()=>{
    expect(component.edit({'name':'fadf'})).toBe();
  })

  xit("init component",()=>{
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(http);
    spyOn(service,"get").and.returnValue(of([{"name":"Tatvasoft"}]));
    component.initAgain();
    expect(component.ds).toEqual([{"name":"Tatvasoft"}]);
  })
});
