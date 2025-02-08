import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }
  header : any = {token : sessionStorage.getItem("token")}
  cartCount : BehaviorSubject<number> = new BehaviorSubject(0);

  getCart():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/cart`,{ headers : this.header});
  }

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/cart`, {productId : productId} , {headers : this.header});
  }

  removeProduct(productId : string):Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart/${productId}`,{headers : this.header});
  }

  updateCartProductQuantity(productId :string , count : number) : Observable<any>{
    return this._HttpClient.put(`${environments.baseUrl}/api/v1/cart/${productId}`, {count : count} , {headers : this.header});
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart`, {headers : this.header});
  }

}
