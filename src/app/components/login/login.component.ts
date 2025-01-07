import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder , private _Router:Router , private _AuthService : AuthService){}
  loading:boolean = false;
  responseMessage !:string;
  loginForm : FormGroup = this._FormBuilder.group({
    email : [null,[Validators.required , Validators.email]],
    password : [null ,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  });

  loginUser():void{
    if(this.loginForm.valid){
      this.loading = true;
      this._AuthService.loginUser(this.loginForm.value).subscribe({
        next : (response) => {
          this.responseMessage = response.message;
          this.loading = false;
          setTimeout(() => {
            this._Router.navigate(['/main']);
          },2000);
          sessionStorage.setItem('token' , response.token);
        },
        error : (response) => {
          this.responseMessage = response.error.message;
          this.loading = false;
        }
      })
      
      console.log("user Logged in successfully");
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

}
