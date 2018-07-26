import { IntencionService } from '../services/Intencion.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Intencion } from '../models/Intencion.interface';
import { AlertifyService } from '../services/alertify.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class EditarIntencionResolve implements Resolve<Intencion> {
  constructor(
    private IntencionServicio: IntencionService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Intencion> {
    const response = this.IntencionServicio.getIntencion(
      route.params['id']
    ).catch(e => {
      this.alertify.error('err');
      this.router.navigate(['/Intencion']);
      return Observable.throw(
        `Se ha generado un error al tratar de obtener el Intencion con  ID ${
          route.params['id']
        }`
      );
    });

    return response;
  }
}
