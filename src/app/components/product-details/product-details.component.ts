import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  private readonly _ProductsService = inject(ProductsService);
  constructor(private _ActivatedRoute : ActivatedRoute){}
  productId !: string| null;
  productDetails : IProduct | null = null;

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

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next : (response) => {
        this.productDetails = response.data;
      }
    })

  }

}
