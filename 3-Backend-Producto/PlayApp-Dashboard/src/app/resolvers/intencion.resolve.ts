import { Injectable } from '@angular/core';
import { IntencionService } from '../services/intencion.service';
import { AlertifyService } from '../services/alertify.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Intencion } from '../models/intencion.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IntencionResolve implements Resolve<Intencion> {
  constructor(
    private intencionServicio: IntencionService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Intencion> {
    const response = this.intencionServicio.getIntenciones().catch(e => {
      this.alertify.error('err');
      this.router.navigate(['/home']);
      return Observable.throw(
        `Se ha generado un error al obtener los Intenciones`
      );
    });

    return response;
  }

  errorHandler(error: any): void {
    console.log(error);
  }
}
