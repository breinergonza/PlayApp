import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../models/usuario.interface';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  model: Usuario = {
    _id: '',
    nombre: '',
    usuario: '',
    claveDinamica: '',
    correo: '',
    sexo: ''
  };

  constructor() {}

  ngOnInit() {}

  registarUsuario(form: NgForm) {
    console.log(this.model);

    form.reset(this.model);
  }
}
