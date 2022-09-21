import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedServiceService } from '../sharedService/shared-service.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpClient;
  let router: Router;
  let service: SharedServiceService;
  let formBuilder : FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,],
      declarations: [ LoginComponent ],
      providers:[FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('init',()=>{
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    let form = formBuilder.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    });
    component.ngOnInit();
    expect(component.loginForm).toBe(form);
  })
});
