import { Component, OnInit } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.interface';

@Component({
  selector: 'app-tarjetas-audio',
  templateUrl: './tarjetas-audio.component.html',
  styleUrls: ['./tarjetas-audio.component.css']
})
export class TarjetasAudioComponent implements OnInit {
  model: Tarjeta = { tipo: '', _id: '' } as Tarjeta;
  constructor() { }

  ngOnInit() {
  }

}
