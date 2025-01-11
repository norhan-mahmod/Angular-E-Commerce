import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  categoryId !: string|null;
  categoryDetails !: Icategory;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (url) => {
        this.categoryId = url.get("categoryId");
      } 
    });

    this._CategoriesService.getCategoryDetails(this.categoryId).subscribe({
      next : (response) => {
        this.categoryDetails = response.data;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }


  
}
