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
  cartCount : BehaviorSubject<number> = new BehaviorSubject(0);

  getCart():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/cart`);
  }

  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/cart`, {productId : productId} );
  }

  removeProduct(productId : string):Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart/${productId}`);
  }

  updateCartProductQuantity(productId :string , count : number) : Observable<any>{
    return this._HttpClient.put(`${environments.baseUrl}/api/v1/cart/${productId}`, {count : count} );
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart`);
  }

}
