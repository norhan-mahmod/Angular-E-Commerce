import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  private _ActivatedRoute = inject(ActivatedRoute);
  private _FormBuilder = inject(FormBuilder);
  shippingAddress : FormGroup = this._FormBuilder.group({
    details : [null , Validators.required],
    phone : [null , Validators.required],
    city : [null , Validators.required]
  });
  cartId !: string | null;
  private _PaymentService = inject(PaymentService)

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (params) => {
        this.cartId = params.get('cartId');
      }
    });
  }

  payOrder():void{
    if(this.shippingAddress.valid){
      this._PaymentService.checkoutSession(this.cartId ! , this.shippingAddress.value).subscribe({
        next : (response) =>{
          window.open(response.session.url , '_self');
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
  }

}
