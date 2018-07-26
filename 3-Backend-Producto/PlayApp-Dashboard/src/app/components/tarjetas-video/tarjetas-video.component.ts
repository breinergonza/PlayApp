import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { TarjetasService } from '../../services/tarjetas.service';
import { AlertifyService } from '../../services/alertify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas-video',
  templateUrl: './tarjetas-video.component.html',
  styleUrls: ['./tarjetas-video.component.css']
})
export class TarjetasVideoComponent implements OnInit {
  @Input() tajetaModel: Tarjeta;
  @Output() tarjetaOut = new EventEmitter<Tarjeta>();

  model: Tarjeta = { tipo: 'TarjetaVideo' } as Tarjeta;

  constructor(
    public sanitizer: DomSanitizer,
    private tarjetaService: TarjetasService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  obtenerUrlVideo(video, obtenerUrlVideo) {
    this.model.urlVideo = video;
  }

  obtenerUrlImagen(thumbnail, obtenerUrlImagen) {
    this.model.urlThumbnail = thumbnail;
  }

  guardarTarjetaBasica(formBasica) {
    // tslint:disable-next-line:no-debugger
    debugger;
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
