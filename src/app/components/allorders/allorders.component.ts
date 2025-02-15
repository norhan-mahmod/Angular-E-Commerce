import { Iorder } from './../../core/interfaces/iorder';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { PaymentService } from '../../core/services/payment.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe , CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit,OnDestroy{
  private _AuthService = inject(AuthService);
  private _PaymentService = inject(PaymentService);
  orders !: Iorder[] ;
  getOrdersSub !: Subscription;
  private _ToastrService = inject(ToastrService);
  
  ngOnInit(): void {
    this._AuthService.DecodeToken();

    this.getOrdersSub = this._PaymentService.getUserOrders(this._AuthService.DecodedToken.id).subscribe({
      next : (response) => {
        this.orders = response;
      },
      error : (err) => {
        this._ToastrService.error(err , "Orders Error");
      }
    });
  }


  ngOnDestroy(): void {
    this.getOrdersSub.unsubscribe();
  }
  
}
