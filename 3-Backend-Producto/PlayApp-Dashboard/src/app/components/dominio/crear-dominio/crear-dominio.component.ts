import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../services/alertify.service';
import { Router } from '@angular/router';
import { DominioService } from '../../../services/dominio.service';

@Component({
  selector: 'app-crear-dominio',
  templateUrl: './crear-dominio.component.html',
  styleUrls: ['./crear-dominio.component.css']
})
export class CrearDominioComponent implements OnInit {
  model: any = {};

  constructor(
    private dominioService: DominioService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  crearDominio() {
    this.dominioService.postDominio(this.model).subscribe(
      next => {
        this.alertify.success('Se ha creado correctamente el Dominio');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.router.navigate(['/dominio']);
      }
    );
  }
}
