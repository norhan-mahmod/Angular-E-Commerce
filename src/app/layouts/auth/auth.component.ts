import { Component } from '@angular/core';
import { AuthNavComponent } from "../../components/auth-nav/auth-nav.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthNavComponent, FooterComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
