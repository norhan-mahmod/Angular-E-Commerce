import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  private readonly _CategoriesService = inject(CategoriesService);
  categories !:Icategory[];
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next : (response) => {
        this.categories = response.data;
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

}
