import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  private _HttpClient = inject(HttpClient);
  userToken : any = {token : sessionStorage.getItem('token')};

  checkoutSession(cartId : string , shippingAddress : object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environments.url}` , 
      {shippingAddress : shippingAddress},
      {headers : this.userToken}
    );
  }

  getUserOrders(userId : string): Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/orders/user/${userId}`);
  }

}
