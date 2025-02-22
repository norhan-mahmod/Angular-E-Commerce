import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass , RouterLink , FormsModule , SearchPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly _BrandsService = inject(BrandsService);
  brands !: Ibrand[];
  numberOfPages !: number;
  pages !: number[];
  currentPage : number = 1;
  searchInputValue :string = '';

  ngOnInit(): void {
    this._BrandsService.getBrandsByPage(1).subscribe({
      next : (response) => {
        this.brands = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.pages = Array.from({length : this.numberOfPages} , (_ , i) =>  i + 1 );
      }
    })
  }

  getBrands(page : number) : void{
    this._BrandsService.getBrandsByPage(page).subscribe({
      next : (response) => {
        this.brands = response.data;
        this.currentPage = response.metadata.currentPage;
      }
    })
  }

}
