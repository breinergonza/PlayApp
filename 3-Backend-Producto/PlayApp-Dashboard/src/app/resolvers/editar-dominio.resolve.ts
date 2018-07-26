import { DominioService } from '../services/dominio.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Dominio } from '../models/dominio.interface';
import { AlertifyService } from '../services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class EditarDominioResolve implements Resolve<Dominio> {
  constructor(
    private DominioServicio: DominioService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Dominio> {
    const response = this.DominioServicio.getDominio(route.params['id']).catch(
      e => {
        this.alertify.error('err');
        this.router.navigate(['/dominio']);
        return Observable.throw(
          `Se ha generado un error al tratar de obtener el Dominio con  ID ${
            route.params['id']
          }`
        );
      }
    );

    return response;
  }
}
