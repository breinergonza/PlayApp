import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Preguntas } from '../../../../models/intencion.interface';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  @Output() preguntaOut = new EventEmitter<Preguntas>();
  pregunta: Preguntas = {} as Preguntas;

  constructor() {}

  ngOnInit() {}

  agregarPregunta() {
    this.preguntaOut.emit(this.pregunta);

    this.pregunta = {} as Preguntas;
  }


}
