import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

import { usuarioData } from '../../data/usuario.data';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  model: Usuario[];
  visible: Boolean = false;

  constructor(
    private usuarioServicio: UsuarioService,
    private activateRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRoute.data.subscribe(data => {
      this.model = <Usuario[]>data['usuarios'];
      this.visible = true;
    });
  }

  eliminarUsuario(id: String, name: String) {
    this.alertify.confirm(
      `¿Está seguro de eliminar al usuario ${name} ?`,
      () => {
        this.usuarioServicio.deleteUsuario(id).subscribe(
          next => {
            this.visible = false;
            this.alertify.success(
              `Se ha eliminado correctamente el usuario ${name}`
            );

            this.usuarioServicio.getUsers().subscribe(
              data => {
                this.model = <Usuario[]>data;
              },
              err => {
                this.alertify.error(err);
              }
            );
          },
          err => {
            this.alertify.error(err);
          }
        );
      }
    );
  }
}
