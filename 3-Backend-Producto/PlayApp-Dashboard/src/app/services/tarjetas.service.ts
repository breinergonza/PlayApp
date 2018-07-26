import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { handlerError, requestOption } from '../helpers/handlerError';
import { Tarjeta } from '../models/tarjeta.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class TarjetasService {
  path: String = 'tarjetas';
  baseUrl = environment.apiUrl;
  constructor(private http: Http) {}

  getTarjetas(): Observable<Tarjeta[]> {
    return this.http
      .get(`${this.baseUrl}/${this.path}`, requestOption())
      .map(res => <Tarjeta[]>res.json())
      .catch(handlerError);
  }

  getTarjeta(id: String): Observable<Tarjeta> {
    return this.http
      .get(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Tarjeta>res.json())
      .catch(handlerError);
  }

  deleteTarjeta(id: String) {
    return this.http
      .delete(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Tarjeta>res.json())
      .catch(handlerError);
  }

  putTarjeta(id: String, modelo: Tarjeta) {
    return this.http
      .put(`${this.baseUrl}/${this.path}/${id}`, modelo, requestOption())
      .map(res => <Tarjeta>res.json())
      .catch(handlerError);
  }

  postTarjeta(modelo: Tarjeta) {
    return this.http
      .post(`${this.baseUrl}/${this.path}`, modelo, requestOption())
      .map(res => <Tarjeta>res.json())
      .catch(handlerError);
  }
}
