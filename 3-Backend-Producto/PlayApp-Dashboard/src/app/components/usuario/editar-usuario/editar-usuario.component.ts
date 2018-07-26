import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../services/alertify.service';
import { usuarioEditarData } from '../../../data/usuario.data';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @ViewChild('usuarioForm') usuarioForm: Usuario;
  model: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.model = data['usuario'];
      },
      error => {
        console.log(error.json());
        // this.alertifyService.error(error);
      }
    );

    // this.model = usuarioEditarData;
  }

  editarUsuario() {
    this.usuarioService.editarUsuario(this.model._id, this.model).subscribe(
      next => {
        this.alertifyService.success('Se ha actualizado correctamente');
      },
      err => {
        this.alertifyService.error(err);
      },
      () => {
        this.router.navigate(['/usuario']);
      }
    );
    // desarrollar el editar usuario
  }
}
