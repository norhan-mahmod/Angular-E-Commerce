import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  @ViewChild('nav') navbar !: ElementRef;

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

}
