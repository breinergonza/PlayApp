import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario.interface';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsuarioService {
  baseUrl = environment.apiUrl;
  constructor(private http: Http) {}

  getUsers(): Observable<Usuario[]> {
    return this.http
      .get(`https://dbasister.azurewebsites.net/api/Usuarios`, this.requestOption())
      .map(res => <Usuario[]>res.json())
      .catch(this.handlerError);
    // return this.http
    //   .get(`https://jsonplaceholder.typicode.com/posts/1`, this.requestOption())
    //   .map(res => <Usuario[]>res.json())
    //   .catch(this.handlerError);
  }

  private requestOption() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    return options;
  }

  private handlerError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();

    let modelStateError = '';

    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          // console.log(serverError[key].join());
          modelStateError += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateError || 'Server error');
  }
}
