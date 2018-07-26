export interface Intencion {
  _id: String;
  idluis: String;
  dominio: String;
  intencion: String;
  tiporespuesta: String;
  preguntas: Preguntas[];
  idtarjetas?: String[];
  opciones?: Opciones[];
  textos: Textos[];
}

export interface Preguntas {
  idluis: String;
  texto: String;
}

// Ejemplo de Paises , Ciudades,
export interface Opciones {
  idintencion: String;
  texto: String;
}

export interface Textos {
  texto: String;
}

export class Respuestas {
  id: String;
  tiporespuesta: String;
  texto: String;
}
