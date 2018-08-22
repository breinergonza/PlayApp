import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

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
