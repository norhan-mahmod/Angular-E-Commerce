import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit , OnDestroy {
  constructor(private _Router:Router){}
  @ViewChild('nav') navbar !: ElementRef;
  cartCount !: number;
  private readonly _CartService = inject(CartService);
  cartCountSub !: Subscription;
  private readonly _ToastrService = inject(ToastrService);

  logout():void{
    sessionStorage.removeItem('token');
    this._Router.navigate(['/auth/login']);
  }
  
  @HostListener('window:scroll') changeScroll():void{
    if(scrollY > 100)
      this.navbar.nativeElement.classList.add('p-3', 'fixed-top');
    else
      this.navbar.nativeElement.classList.remove('p-3', 'fixed-top');
  }

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next : (response) => {
        this.cartCount = response.numOfCartItems;
      },
      error : (err) => {
        this._ToastrService.error(err);
      }
    });

    this.cartCountSub = this._CartService.cartCount.subscribe({
      next : (value) => {
        this.cartCount = value;
      }
    });
  }

  ngOnDestroy(): void {
    this.cartCountSub?.unsubscribe();
  }

}
