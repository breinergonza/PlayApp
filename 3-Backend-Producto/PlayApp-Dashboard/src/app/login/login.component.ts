import { Component, OnInit } from '@angular/core';

import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  IniciarSesion() {

    if (this.model.email == null || this.model.password == null) {
      this.alertify.error('Los campos email o password no pueden estar en blanco');
    }

    if (this.model.email === 'administrador' && this.model.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      this.alertify.error('Datos invalidos');
    }
  }
}
