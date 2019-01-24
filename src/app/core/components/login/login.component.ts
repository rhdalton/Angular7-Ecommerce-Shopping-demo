import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  login(credentials) {
    this.auth.login(credentials);
  }
  loginGoogle() {
    this.auth.loginGoogle();
  }
}
