import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from '../models/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioResolve implements Resolve<Usuario> {
  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    const response = this.usuarioServicio
      .getUsers()
      .catch(e => {
        this.alertify.error('err');
        this.router.navigate(['/home']);
        return Observable.throw(
          `Se ha generado un error al obtener los usuarios`
        );
      });

    return response;
  }

  errorHandler(error: any): void {
    console.log(error);
  }
}
