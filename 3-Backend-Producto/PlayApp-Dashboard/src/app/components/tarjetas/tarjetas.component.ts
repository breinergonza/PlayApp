import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.interface';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  model: Tarjeta = { tipo: '', _id: '' } as Tarjeta;
  tipo: String = '';
  constructor() {}

  ngOnInit() {}

  cambioTipo(value) {
    this.tipo = value;
  }
}
