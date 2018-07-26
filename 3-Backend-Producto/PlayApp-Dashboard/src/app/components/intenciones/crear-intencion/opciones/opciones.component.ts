import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Opciones, Intencion } from '../../../../models/intencion.interface';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  @Output() opcionOut = new EventEmitter<Opciones>();
  @Input() intenciones: Intencion[] = [];
  opcion: String;
  texto: String;

  titulo: string;

  desahabilitarTitulo: Boolean = true;

  constructor() {}

  ngOnInit() {
    this.opcion = '';
  }

  agregarRespuesta(texto, opcion) {
    this.opcion = '';
    this.texto = '';
    this.opcionOut.emit({
      idintencion: opcion,
      texto: texto
    });

    if (!opcion) {
      this.titulo = texto;
      this.desahabilitarTitulo = false;
    }
  }

  // cambioValor(value: string) {
  //   // const resultado = this.intenciones.find(res => {
  //   //   return res._id === value;
  //   // });
  //   // if (typeof resultado !== 'undefined') {
  //   //   this.opcionOut.emit({
  //   //     idintencion: this.opcion,
  //   //     texto: this.texto
  //   //   });
  //   // }
  // }
}
