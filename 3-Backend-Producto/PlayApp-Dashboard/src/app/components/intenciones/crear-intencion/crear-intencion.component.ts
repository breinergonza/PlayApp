import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Intencion,
  Preguntas,
  Opciones,
  Textos,
  Respuestas
} from '../../../models/intencion.interface';
import { AlertifyService } from '../../../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IntencionService } from '../../../services/intencion.service';
import { Tarjeta } from '../../../models/tarjeta.interface';
import { TarjetasService } from '../../../services/tarjetas.service';
import { DominioService } from '../../../services/dominio.service';
import { Dominio } from '../../../models/dominio.interface';

@Component({
  selector: 'app-crear-intencion',
  templateUrl: './crear-intencion.component.html',
  styleUrls: ['./crear-intencion.component.css']
})
export class CrearIntencionComponent implements OnInit {
  @ViewChild('intencionForm') intencionForm: Intencion;
  model: Intencion = {} as Intencion;
  opcionesAux: Opciones;
  tarjetaAux: Tarjeta;
  textoAux: String;
  dominios: Dominio[] = [];
  respuestas: Respuestas[] = [];
  desahabilitarAgregar: Boolean = false;
  intenciones: Intencion[] = [];
  tarjetas: Tarjeta[] = [];

  constructor(
    private alertify: AlertifyService,
    private router: Router,
    private intencionService: IntencionService,
    private tarjetasService: TarjetasService,
    private dominioService: DominioService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.model['preguntas'] = [];
    this.model['opciones'] = [];
    this.model['idtarjetas'] = [];
    this.model['textos'] = [];
    this.model.tiporespuesta = '';
    this.model.dominio = '';

    this.activateRoute.data.subscribe(data => {
      console.log(data);
      this.tarjetas = <Tarjeta[]>data['tarjetas'];
      this.intenciones = <Intencion[]>data['intenciones'];

      // console.warn(this.intenciones);
      this.dominios = <Dominio[]>data['dominios'];
    });
  }

  asignarOpcion(value: Opciones) {
    console.log(value);
    this.opcionesAux = value;

    this.agregarRespuesta(this.model.tiporespuesta);
  }

  asignarTarjeta(value: Tarjeta) {
    this.tarjetaAux = value;
  }

  agregarRespuesta(tiporespuesta: String) {
    switch (tiporespuesta) {
      case 'Basica':
        const resAux: Textos = {
          texto: this.textoAux
        } as Textos;
        this.model.textos.push(resAux);

        this.agregarRespuestas({
          id: '',
          texto: resAux.texto,
          tiporespuesta
        } as Respuestas);
        this.textoAux = '';
        break;
      case 'Tarjeta':
        this.model.idtarjetas.push(this.tarjetaAux._id.toString());
        this.agregarRespuestas({
          id: this.tarjetaAux._id,
          texto: this.tarjetaAux.titulo,
          tiporespuesta
        } as Respuestas);
        break;
      case 'ConOpciones':
      if (this.opcionesAux.idintencion) {
        this.model.opciones.push(this.opcionesAux);
        this.agregarRespuestas({
          id: this.opcionesAux.idintencion,
          texto: this.opcionesAux.texto,
          tiporespuesta
        } as Respuestas);
      } else {
        const resAux2: Textos = {
          texto: this.opcionesAux.texto
        } as Textos;
        this.model.textos.push(resAux2);
        this.desahabilitarAgregar = true;
        this.textoAux = '';
      }
        break;
      default:
        break;
    }

    if (this.respuestas.length !== 0) {
      this.desahabilitarAgregar = true;
    }
  }

  agregarRespuestas(respuesta: Respuestas) {
    this.respuestas.push(respuesta);

    console.log(this.respuestas);
  }

  crearIntencion() {
    this.intencionService.postIntencion(this.model).subscribe(
      data => {
        this.alertify.success('Se ha guardado intención corretamente');
      },
      err => {
        this.alertify.error(err);
      },
      () => {
        this.router.navigate(['/intencion']);
      }
    );
  }

  eliminarIndex(index: number) {
    this.model.preguntas.map((res, i) => {
      if (i === index) {
        this.model.preguntas.splice(i, 1);
      }
    });
  }

  eliminarRespuestasIndex(index: number) {
    this.respuestas.map((res, i) => {
      if (i === index) {
        this.respuestas.splice(i, 1);

        switch (res.tiporespuesta) {
          case 'Basica':
            this.model.textos.splice(i, 1);
            break;
          case 'Tarjeta':
            this.model.idtarjetas.splice(i, 1);
            break;
          case 'ConOpciones':
            this.model.opciones.splice(i, 1);
            break;
        }
      }
    });

    if (this.respuestas.length === 0) {
      this.desahabilitarAgregar = false;
    }
  }

  agregarPregunta(pregunta: Preguntas) {
    this.model.preguntas.push(pregunta);
    console.log(this.model);
  }
}
