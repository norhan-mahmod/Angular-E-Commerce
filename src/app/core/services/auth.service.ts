import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  DecodedToken : any ;
  constructor(private _HttpClient:HttpClient) { }
  private _PLATFORM_ID = inject(PLATFORM_ID);

  registerUser(userData:object): Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signup`,userData);
  }

  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signin`,userData);
  }
  
  DecodeToken():void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(sessionStorage.getItem("token"))
        this.DecodedToken = jwtDecode(sessionStorage.getItem("token")!);
    }
  }

}
