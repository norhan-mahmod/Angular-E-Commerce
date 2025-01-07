import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient)
  
  constructor() { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/categories`);
  }
}
