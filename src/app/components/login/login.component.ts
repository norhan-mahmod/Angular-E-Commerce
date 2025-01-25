import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  constructor(private _FormBuilder:FormBuilder , private _Router:Router , private _AuthService : AuthService){}
  loading:boolean = false;
  setTimeoutId :any;
  loginSub !:Subscription;
  private readonly _ToastrService = inject(ToastrService);

  loginForm : FormGroup = this._FormBuilder.group({
    email : [null,[Validators.required , Validators.email]],
    password : [null ,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  });

  loginUser():void{
    if(this.loginForm.valid){
      this.loading = true;
      this.loginSub = this._AuthService.loginUser(this.loginForm.value).subscribe({
        next : (response) => {
          this.loading = false;
          this.setTimeoutId = setTimeout(() => {
            this._Router.navigate(['/main']);
          },1000);
          sessionStorage.setItem('token' , response.token);
          this._AuthService.DecodeToken();
          this._ToastrService.success(response.message , "User Logged in" , {timeOut : 2000});
        },
        error : (response) => {
          this.loading = false;
          this._ToastrService.error(response.error.message , "Error", {timeOut : 2000});
        }
      })
      
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.setTimeoutId);
    this.loginSub?.unsubscribe();
  }

}
