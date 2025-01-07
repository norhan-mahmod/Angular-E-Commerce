import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  registerUser(userData:object): Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signup`,userData);
  }

  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signin`,userData);
  }
  
}
