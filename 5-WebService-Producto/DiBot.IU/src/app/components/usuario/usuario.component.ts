import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

import { usuarioData } from '../../data/usuario.data';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  model: Usuario[];
  visible: Boolean = false;

  constructor(private usuarioServicio: UsuarioService) {}

  ngOnInit() {
    this.usuarioServicio.getUsers().subscribe((data) => {
      console.log(data);
      this.model = data;
      this.visible = true;
    });

    // this.model = <Usuario[]>usuarioData;
    // this.visible = true;

    console.log(this.model);
  }

  registarUsuario(form: NgForm) {
    console.log(this.model);

    form.reset(this.model);
  }
}
