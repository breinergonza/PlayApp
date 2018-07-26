import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../services/alertify.service';
import { DominioService } from '../../services/dominio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dominio } from '../../models/dominio.interface';

@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
  styleUrls: ['./dominio.component.css']
})
export class DominioComponent implements OnInit {
  dominio: Dominio[];

  constructor(
    private alertify: AlertifyService,
    private dominioService: DominioService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activateRouter.data.subscribe(data => {
      this.dominio = <Dominio[]>data['dominios'];
      console.log(this.dominio);
    });
  }

  eliminarDomino(id: String, name: String) {
    this.alertify.confirm(
      `¿Está seguro de eliminar el formulario ${name} ?`,
      () => {
        this.dominioService.deleteDominio(id).subscribe(
          next => {
            this.alertify.success(
              `Se ha eliminado correctamente el formulario ${name}`
            );

            this.dominioService.getDominios().subscribe(
              data => {
                this.dominio = <Dominio[]>data;
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
