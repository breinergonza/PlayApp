import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario.interface';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../services/alertify.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  @ViewChild('usuarioForm') usuarioForm: Usuario;

  model: any = {};

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  registarUsuario() {
    this.usuarioService.postUsuario(this.model).subscribe(
      next => {
        this.alertify.success('Se ha creado correctamente el usuario');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.router.navigate(['/usuario']);
      }
    );
  }
}
