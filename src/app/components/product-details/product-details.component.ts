import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit , OnDestroy{
  private readonly _ProductsService = inject(ProductsService);
  constructor(private _ActivatedRoute : ActivatedRoute){}
  productId !: string| null;
  productDetails : IProduct | null = null;
  getProductDetailsSub !: Subscription;
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  addProductToCartSub !: Subscription;

  productImagesSlider: OwlOptions = {
    loop: true,
    autoplay : true,
    autoplayTimeout : 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items : 1,
    nav: false
  }

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next : (productInfo) => {
        this.productId = productInfo.get('productId');
      }
    });

    this.getProductDetailsSub = this._ProductsService.getProductDetails(this.productId).subscribe({
      next : (response) => {
        this.productDetails = response.data;
      }
    })

  }

  addProductToCart(id:string):void{
    this.addProductToCartSub = this._CartService.addProductToCart(id).subscribe({
      next : (response) => {
        this._ToastrService.success(response.message , response.status);
        this._CartService.cartCount.next(response.numOfCartItems);
      }
    })
  }

  ngOnDestroy(): void {
    this.getProductDetailsSub?.unsubscribe();
  }

}
