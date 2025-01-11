import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }

  getBrandsByPage(page : number):Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands`, {params : {limit : 10 , page : page}});
  }

  getBrandDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands/${id}`);
  }

}
