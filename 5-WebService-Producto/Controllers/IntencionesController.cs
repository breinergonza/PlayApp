using Api.Recursos;
using PlayApp.Datos.DAO;
using PlayApp.IC.DTO;
using Microsoft.Ajax.Utilities;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class IntencionesController : ApiController
    {
        public static CrudIntenciones _Intenciones;

        public IntencionesController()
        {
            _Intenciones = new CrudIntenciones();
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var respuesta = await _Intenciones.Listar();

            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                return Ok(respuesta);

            }

        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                var result = await _Intenciones.Buscar(new Intenciones() {_id = ObjectId.Parse(id)});

                if (result == null)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }

                return Ok(result);
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }


        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Intenciones intencion)
        {        

            if (intencion.dominio.IsNullOrWhiteSpace() ||
                intencion.intencion.IsNullOrWhiteSpace() 
            )
            {
                return BadRequest(string.Format(TitulosPersonalizados.ErrorCamposRequeridos, "Dominio y Intención"));
            }

            //Si las preguntas no se repiten entonces entra a ejecutar las operaciones para insertar la intención
            if (!ExistenPreguntasRepetidas(intencion.preguntas))
            {
                var validarIntencion = await _Intenciones.BuscarIntencion(intencion.intencion);

                if (validarIntencion != null)
                {
                    return BadRequest($"Ya existe una posible respuesta con el enunciado '{intencion.intencion}' .");
                }
                
                //Se insertan los datos en BD
                var respuesta = await _Intenciones.InsertarActualizar(intencion, null);

                if (respuesta == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                return Ok(respuesta);
            }
            else
            {
                return BadRequest("Existen preguntas repetidas en la intención que desea crear");
            }
        }

        [HttpPut]
        public async Task<IHttpActionResult> Put(string id, [FromBody] Intenciones intencion)
        {
            if (intencion.dominio.IsNullOrWhiteSpace() ||
                intencion.intencion.IsNullOrWhiteSpace()
            )
            {
                return BadRequest(string.Format(TitulosPersonalizados.ErrorCamposRequeridos, "Dominio y Intención"));
            }

            //Si las preguntas no se repiten entonces entra a ejecutar las operaciones para insertar la intención
            if (!ExistenPreguntasRepetidas(intencion.preguntas))
            {
                //Si llega a este punto quiere decir que pasa las validaciones y no se presentó ningun error 
                //por consiguiente se insertan la intención en BD
                var respuesta = await _Intenciones.InsertarActualizar(intencion, id);

                if (respuesta == null)
                {
                    return BadRequest("Se presento un error al intentar actualizar la intención en Base de Datos");
                }

                return Ok(respuesta);
            }
            else
            {
                return BadRequest("Existen preguntas repetidas.");
            }
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            if (id.IsNullOrWhiteSpace())
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var buscarIntension = await _Intenciones.Buscar(new Intenciones() { _id = ObjectId.Parse(id) });

            if (buscarIntension != null)
            {
                bool respuesta = await _Intenciones.Eliminar(ObjectId.Parse(id));

                if (respuesta == false)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                return Ok(respuesta);
            }
            else
            {
                return BadRequest("La intención que intentar eliminar no existe!");
            }
        }


        #region Funciones privadas con logica de negocio

        /// <summary>
        /// Función que permite validar que las preguntas no se repitan
        /// </summary>
        /// <param name="preguntas"></param>
        /// <returns></returns>
        private bool ExistenPreguntasRepetidas(List<Preguntas> preguntas)
        {
            bool hayRepetidas = false;

            foreach (var pregunta in preguntas)
            {
                int repetidos = preguntas.Count(x => x.texto == pregunta.texto);

                if (repetidos > 1)
                {
                    hayRepetidas = true;
                }
            }

            return hayRepetidas;
        }

        #endregion

    }
}
