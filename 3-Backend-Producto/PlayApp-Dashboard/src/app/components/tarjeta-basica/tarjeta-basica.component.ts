import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.interface';
import { TarjetasService } from '../../services/tarjetas.service';
import { AlertifyService } from '../../services/alertify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-basica',
  templateUrl: './tarjeta-basica.component.html',
  styleUrls: ['./tarjeta-basica.component.css']
})
export class TarjetaBasicaComponent implements OnInit {
  @Input() tajetaModel: Tarjeta;
  @Output() tarjetaOut = new EventEmitter<Tarjeta>();

  model: Tarjeta = { tipo: 'TarjetaBasica' } as Tarjeta;

  constructor(
    private tarjetaService: TarjetasService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  obtenerUrlImagen(imagen, obtenerUrlImagen) {
    this.model.urlImagen = imagen;
  }

  guardarTarjetaBasica(formBasica) {
    this.tarjetaService.postTarjeta(<Tarjeta>formBasica.value).subscribe(
      data => {
        this.alertify.success('Tarjeta creada exitosamente');
      },
      error => {
        this.alertify.error(
          'Se ha presentado un error en la creación de la tarjeta'
        );
      },
      () => {
        this.router.navigate(['/tarjeta']);
      }
    );
  }
}
