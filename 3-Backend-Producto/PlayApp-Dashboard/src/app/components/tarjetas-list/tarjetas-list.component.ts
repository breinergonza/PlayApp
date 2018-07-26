import { TarjetasService } from './../../services/tarjetas.service';
import { Tarjeta } from './../../models/tarjeta.interface';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css']
})
export class TarjetasListComponent implements OnInit {
  tarjetas: Tarjeta[] = [];

  constructor(
    private tarjetaService: TarjetasService,
    private alertify: AlertifyService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRouter.data.subscribe(data => {
      this.tarjetas = <Tarjeta[]>data['tarjeta'];
      console.log('data resolve tarjeta', this.tarjetas);
    });
  }

  eliminarTarjeta(id, name) {
    this.alertify.confirm(
      `¿Está seguro de eliminar la tarjeta ${name} ?`,
      () => {
        this.tarjetaService.deleteTarjeta(id).subscribe(
          next => {
            this.alertify.success(
              `Se ha eliminado correctamente la tarjeta ${name}`
            );

            this.tarjetaService.getTarjetas().subscribe(
              data => {
                this.tarjetas = <Tarjeta[]>data;
              },
              err => {
                this.alertify.error(err);
              }
            );
          },
          err => {
            this.alertify.error(err);
          }
        );
      }
    );
  }
}
