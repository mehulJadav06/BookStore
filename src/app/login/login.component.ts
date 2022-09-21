import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,private http : HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/registeredUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Successfully "+ user.firstName);
        localStorage.setItem("token",user.email);
        localStorage.setItem("isAdmin",user.isAdmin);
        this.loginForm.reset();
        this.router.navigate(['products'])
          .then(() => {
            window.location.reload();
          });
      }
      else{
        alert("User doesn't Found");
      }
    },err=>{
      alert("Something went wrong !!"+err);
      console.log(err);
    });
  }

}
