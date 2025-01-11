import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass , RouterLink , CurrencyPipe , FormsModule , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  private readonly _ProductsService = inject(ProductsService);
  products !: IProduct[];
  pages !: number[];
  numberOfPages !: number;
  currentPage : number = 1;
  searchInputValue : string = ' ';

  ngOnInit(): void {
    this._ProductsService.getProductsByPage(1).subscribe({
      next : (response) => {
        this.products = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.pages = Array.from({length : this.numberOfPages} , (_ , i) => i+1);
      },
      error : (err) => {
        console.log(err.error);
      }
    })
  }
  getProducts(page: number):void{
    this._ProductsService.getProductsByPage(page).subscribe({
      next : (response) => {
        this.products = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

}
