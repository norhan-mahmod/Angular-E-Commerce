import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , CurrencyPipe , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{

  products !: IProduct[];
  productSub !: Subscription;
  categories !: Icategory[];
  categorySub !: Subscription;
  searchInputValue :string = '';

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 2000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  constructor(private _ProductsService:ProductsService , private _CategoriesService:CategoriesService){}

  addProductSub !: Subscription;

  ngOnInit(): void {
    this.productSub = this._ProductsService.getProducts().subscribe({
      next : (response) => {
        this.products = response.data.slice(0,20);
      }
    });
    
    this.categorySub = this._CategoriesService.getAllCategories().subscribe({
      next : (response) => {
        this.categories = response.data;
      }
    })
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }

  addProductToCart(id : string): void{
    this.addProductSub = this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message , response.status);
        this._CartService.cartCount.next(response.numOfCartItems);
      }
    })
  }

}
