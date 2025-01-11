import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink , FormsModule , SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  private readonly _CategoriesService = inject(CategoriesService);
  categories !:Icategory[];
  searchInputValue :string = '';
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
