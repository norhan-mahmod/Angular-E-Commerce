import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy{
  private readonly _CartService = inject(CartService);
  cartData = {} as Icart;
  cartSub !:Subscription;
  deleteProductSub !: Subscription;
  updateProductQuantitySub !: Subscription;
  clearCartSubscription !: Subscription;
  getCartSub !: Subscription;
  private readonly _ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.cartSub = this._CartService.getCart().subscribe({
      next : (response) =>{
        this.cartData = response.data;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.deleteProductSub?.unsubscribe();
    this.updateProductQuantitySub?.unsubscribe();
    this.clearCartSubscription?.unsubscribe();
    this.getCartSub?.unsubscribe();
  }

  deleteProduct(productId : string) : void{
    this.deleteProductSub = this._CartService.removeProduct(productId).subscribe({
      next : (response) =>{
        this.cartData = response.data;
        this._ToastrService.success("Product Removed successfully From Your Cart","Cart");
      },
      error: (err)=> {
        this._ToastrService.success(err);
      }
    });
  }

  updateProductQuantity(productId :  string , count : number):void{
    this.updateProductQuantitySub = this._CartService.updateCartProductQuantity(productId , count).subscribe({
      next : (response) => {
        this.cartData = response.data;
        this._ToastrService.success("Product Quantity Updated Successfully" , "Product Quantity");
      },
      error : (err) => {
        this._ToastrService.error(err.message , "Cart");
      }
    });
  }

  clearCart():void{
    this.clearCartSubscription = this._CartService.clearCart().subscribe({
      next : (response) => {
        this.getCartSub = this._CartService.getCart().subscribe({
          next : (response) => {
            this.cartData = response.data;
          },
          error : (err) =>{
            console.log(err);
          }
        });
        this._ToastrService.success("Cart Cleared Successfully");
      },
      error : (err) => {
        console.log(err);
        this._ToastrService.error(err);
      }
    });
  }

}
