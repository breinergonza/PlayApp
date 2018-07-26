import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tarjeta } from '../models/tarjeta.interface';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { TarjetasService } from '../services/tarjetas.service';

@Injectable()
export class TarjetaResolve implements Resolve<Tarjeta> {
  constructor(
    private tarjetaService: TarjetasService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Tarjeta> {
    const response = this.tarjetaService.getTarjetas().catch(e => {
      this.alertify.error('err');
      this.router.navigate(['/home']);
      return Observable.throw(
        `Se ha generado un error al obtener las tarjetas`
      );
    });

    return response;
  }

  errorHandler(error: any): void {
    console.log(error);
  }
}
