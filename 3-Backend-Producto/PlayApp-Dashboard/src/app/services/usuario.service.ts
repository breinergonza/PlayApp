import { handlerError, requestOption } from '../helpers/handlerError';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.interface';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {
  baseUrl = environment.apiUrl;
  constructor(private http: Http) {}

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get(`${this.baseUrl}/usuarios`, requestOption())
      .map(res => <Usuario[]>res.json())
      .catch(handlerError);
  }

  postUsuario(usuario: Usuario) {
    return this.http
      .post(`${this.baseUrl}/usuarios`, usuario, requestOption())
      .catch(handlerError);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http
      .get(`${this.baseUrl}/usuarios/${id}`, requestOption())
      .map(res => <Usuario>res.json())
      .catch(handlerError);
  }

  editarUsuario(id: string, usuario: Usuario) {
    return this.http
      .put(`${this.baseUrl}/usuarios/${id}`, usuario, requestOption())
      .catch(handlerError);
  }

  deleteUsuario(id: String) {

    console.log(id);
    return this.http
      .delete(`${this.baseUrl}/usuarios/${id}`, requestOption())
      .catch(handlerError);
  }
}
