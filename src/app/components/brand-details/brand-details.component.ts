import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);
  brandDetails !: Ibrand;
  brandId !: string|null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (url) => {
        this.brandId = url.get("brandId");
      }
    });

    this._BrandsService.getBrandDetails(this.brandId).subscribe({
      next : (response) => {
        this.brandDetails = response.data;
      }
    });
    
  }
}
