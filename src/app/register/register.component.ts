import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isAdmin: ['false']
    })
  }
  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.confirmPassword) {
        alert("Password and Confirm Password Should Match");
      }
      else {
        this.http.get<any>("http://localhost:3000/registeredUsers")
          .subscribe(res => {
            const user = res.find((a: any) => {
              return a.email == this.registerForm.value.email
            });
            if(user){
              alert("User Alerady exist");
            }
            else{
              this.http.post<any>("http://localhost:3000/registeredUsers", this.registerForm.value)
              .subscribe(result => {
                alert("Registered Successfully");
                this.registerForm.reset();
                this.router.navigate(['login']);
              }, err => {
                alert("Something is wrong here");
              });
            }
          });
      }
    }
  }

}
