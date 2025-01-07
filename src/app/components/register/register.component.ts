import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  loading:boolean = false;
  responseMessage!:string;
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [ Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null ,[Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.comparePassword);

  registerUser(){
    if(this.registerForm.valid){
      this.loading = true;
      this._AuthService.registerUser(this.registerForm.value).subscribe({
        next : (response) => {
          this.responseMessage = response.message;
          this.loading = false;
          setTimeout(() => {
            this._Router.navigate(['/auth/login']);
          }, 2000);
        },
        error : (response) => {this.responseMessage = response.error.message},
        complete : () => {console.log("Complete Method")}
      });
    }
    else{
      this.registerForm.setErrors({MissMatch: true});
      this.registerForm.markAllAsTouched();
    }
  }
  comparePassword(fGroup: AbstractControl):(null|object){
    if(fGroup.get("password")?.value === fGroup.get("rePassword")?.value)
      return null;
    else
      return {MissMatch : true};
  }
}
