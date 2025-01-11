import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass , RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService = inject(BrandsService);
  brands !: Ibrand[];
  numberOfPages !: number;
  pages !: number[];
  currentPage : number = 1;

  ngOnInit(): void {
    this._BrandsService.getBrandsByPage(1).subscribe({
      next : (response) => {
        this.brands = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.pages = Array.from({length : this.numberOfPages} , (_ , i) =>  i + 1 );
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  getBrands(page : number) : void{
    this._BrandsService.getBrandsByPage(page).subscribe({
      next : (response) => {
        this.brands = response.data;
        this.currentPage = response.metadata.currentPage;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

}
