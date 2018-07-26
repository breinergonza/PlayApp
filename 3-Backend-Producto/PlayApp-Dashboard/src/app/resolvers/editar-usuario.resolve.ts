import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from '../models/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class EditarUsuarioResolve implements Resolve<Usuario> {
  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {
    const response = this.usuarioServicio
      .getUsuario(route.params['id'])
      .catch(e => {
        this.alertify.error('err');
        this.router.navigate(['/usuario']);
        return Observable.throw(
          `Se ha generado un error al tratar de obtener el usuario con  ID ${
            route.params['id']
          }`
        );
      });

    return response;
  }
}
