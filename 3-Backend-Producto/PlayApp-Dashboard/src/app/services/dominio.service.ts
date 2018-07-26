import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Dominio } from '../models/dominio.interface';
import { Observable } from 'rxjs/Observable';
import { handlerError, requestOption } from '../helpers/handlerError';

@Injectable()
export class DominioService {
  baseUrl = environment.apiUrl;
  path: String = 'dominios';
  constructor(private http: Http) {}

  getDominios(): Observable<Dominio[]> {
    return this.http
      .get(`${this.baseUrl}/${this.path}`, requestOption())
      .map(res => <Dominio[]>res.json())
      .catch(handlerError);
  }

  getDominio(id: String): Observable<Dominio> {
    return this.http
      .get(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Dominio>res.json())
      .catch(handlerError);
  }

  deleteDominio(id: String) {
    return this.http
      .delete(`${this.baseUrl}/${this.path}/${id}`, requestOption())
      .map(res => <Dominio>res.json())
      .catch(handlerError);
  }

  putDominio(id: String, modelo: Dominio) {
    return this.http
      .put(`${this.baseUrl}/${this.path}/${id}`, modelo, requestOption())
      .map(res => <Dominio>res.json())
      .catch(handlerError);
  }

  postDominio(modelo: Dominio) {
    return this.http
      .post(`${this.baseUrl}/${this.path}`, modelo, requestOption())
      .map(res => <Dominio>res.json())
      .catch(handlerError);
  }
}
