import { RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass , RouterLink , CurrencyPipe , FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy{
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  products !: IProduct[];
  pages !: number[];
  numberOfPages !: number;
  currentPage : number = 1;
  searchInputValue : string = '';
  addProductSub !: Subscription;
  getProductsSub !: Subscription;
  getProductsOnInitSub !: Subscription;

  ngOnInit(): void {
    this.getProductsOnInitSub = this._ProductsService.getProductsByPage(1).subscribe({
      next : (response) => {
        this.products = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.pages = Array.from({length : this.numberOfPages} , (_ , i) => i+1);
      }
    })
  }
  getProducts(page: number):void{
    this.getProductsSub = this._ProductsService.getProductsByPage(page).subscribe({
      next : (response) => {
        this.products = response.data;
        this.currentPage = response.metadata.currentPage;
      }
    })
  }

  addProductToCart(id : string):void{
    this.addProductSub = this._CartService.addProductToCart(id).subscribe({
      next : (response) => {
        this._ToastrService.success(response.message , response.status);
        this._CartService.cartCount.next(response.numOfCartItems);
      }
    });
  }

  ngOnDestroy(): void {
    this.getProductsOnInitSub?.unsubscribe();
    this.getProductsSub?.unsubscribe();
    this.addProductSub?.unsubscribe();
  }

}
