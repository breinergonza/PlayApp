import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Dominio } from '../models/dominio.interface';
import { UsuarioService } from '../services/usuario.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DominioService } from '../services/dominio.service';

@Injectable()
export class DominioResolve implements Resolve<Dominio> {
  constructor(
    private DominioServicio: DominioService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Dominio> {
    const response = this.DominioServicio.getDominios().catch(e => {
      this.alertify.error('err');
      this.router.navigate(['/home']);
      return Observable.throw(
        `Se ha generado un error al obtener los Dominios`
      );
    });

    return response;
  }

  errorHandler(error: any): void {
    console.log(error);
  }
}
