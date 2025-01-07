import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent {
  constructor(private _Router:Router){}
  logout():void{
    sessionStorage.removeItem('token');
    this._Router.navigate(['/auth/login']);
  }
}
