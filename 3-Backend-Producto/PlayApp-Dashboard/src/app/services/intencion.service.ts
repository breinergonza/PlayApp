import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Intencion } from '../models/intencion.interface';
import { handlerError, requestOption } from '../helpers/handlerError';

@Injectable()
export class IntencionService {
  baseUrl = environment.apiUrl;
  path: String = 'intenciones';
  constructor(private http: Http) {}

  getIntenciones(): Observable<Intencion[]> {
    return this.http
      .get(`${this.baseUrl}/${this.path}`, requestOption())
      .map(res => <Intencion[]>res.json())
      .catch(handlerError);
  }

  getIntencion(id: String): Observable<Intencion> {
    return this.http
      .get(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Intencion>res.json())
      .catch(handlerError);
  }

  deleteIntencion(id: String) {
    return this.http
      .delete(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Intencion>res.json())
      .catch(handlerError);
  }

  putIntencion(id: String, modelo: Intencion) {
    return this.http
      .put(`${this.baseUrl}/${this.path}/${id}`, modelo, requestOption())
      .map(res => <Intencion>res.json())
      .catch(handlerError);
  }

  postIntencion(modelo: Intencion) {
    return this.http
      .post(`${this.baseUrl}/${this.path}`, modelo, requestOption())
      .map(res => <Intencion>res.json())
      .catch(handlerError);
  }
}
