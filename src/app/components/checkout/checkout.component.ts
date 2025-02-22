import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit , OnDestroy{
  private _ActivatedRoute = inject(ActivatedRoute);
  private _FormBuilder = inject(FormBuilder);
  shippingAddress : FormGroup = this._FormBuilder.group({
    details : [null , Validators.required],
    phone : [null , Validators.required],
    city : [null , Validators.required]
  });
  cartId !: string | null;
  private _PaymentService = inject(PaymentService);
  payOrderSub !: Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (params) => {
        this.cartId = params.get('cartId');
      }
    });
  }

  payOrder():void{
    if(this.shippingAddress.valid){
      this.payOrderSub = this._PaymentService.checkoutSession(this.cartId ! , this.shippingAddress.value).subscribe({
        next : (response) =>{
          window.open(response.session.url , '_self');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.payOrderSub?.unsubscribe();
  }

}
