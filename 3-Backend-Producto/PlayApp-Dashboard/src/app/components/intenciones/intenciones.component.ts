import { AlertifyService } from './../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intencion } from '../../models/intencion.interface';
import { IntencionService } from '../../services/intencion.service';

@Component({
  selector: 'app-intenciones',
  templateUrl: './intenciones.component.html',
  styleUrls: ['./intenciones.component.css']
})
export class IntencionesComponent implements OnInit {
  intenciones: Intencion[] = [];
  constructor(
    private activateRouter: ActivatedRoute,
    private intencionService: IntencionService, private alertify: AlertifyService
  ) {}
  ngOnInit() {
    this.activateRouter.data.subscribe(data => {
      this.intenciones = <Intencion[]>data['intencion'];

      console.log(this.intenciones);
    });
  }

  eliminarIntencion(id, name) {
    this.alertify.confirm(
      `¿Está seguro de eliminar la intención ${name} ?`,
      () => {
        this.intencionService.deleteIntencion(id).subscribe(
          next => {
            this.alertify.success(
              `Se ha eliminado correctamente la intención ${name}`
            );

            this.intencionService.getIntenciones().subscribe(
              data => {
                this.intenciones = <Intencion[]>data;
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
