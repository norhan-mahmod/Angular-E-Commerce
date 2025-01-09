import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getProducts():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/products`);
  }

  getProductsByPage(page:number):Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/products`, {params : {limit : '12' , page : page}});
  }
}
