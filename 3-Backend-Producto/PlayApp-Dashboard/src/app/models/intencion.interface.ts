export interface Intencion {
  _id: String;
  idluis: String;
  dominio: String;
  intencion: String;
  preguntas: Preguntas[];
}

export interface Preguntas {
  texto: String;
  esCorrecta: Boolean;
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
