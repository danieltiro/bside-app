import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  register(){
    this.router.navigate(['/auth/login']);
  }
}
