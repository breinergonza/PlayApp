import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Tarjeta } from '../../../../models/tarjeta.interface';

@Component({
  selector: 'app-tarjetas-respuesta',
  templateUrl: './tarjetas-respuesta.component.html',
  styleUrls: ['./tarjetas-respuesta.component.css']
})
export class TarjetasRespuestaComponent implements OnInit {
  @Output() tarjetaOut = new EventEmitter<Tarjeta>();
  @Input() tarjetas: Tarjeta[] = [];

  tarjeta: String;


  constructor() {}

  ngOnInit() {
    this.tarjeta = '';
  }

  cambioValor(value: string) {
    const resultado = this.tarjetas.find(res => {
      return res._id === value;
    });

    if (typeof resultado !== 'undefined') {
      this.tarjetaOut.emit(resultado);
      console.log(resultado);
    }
  }
}
