using PlayApp.Datos.DAO;
using PlayApp.IC.DTO;
using Microsoft.Ajax.Utilities;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Api.Recursos;

namespace Api.Controllers
{
    public class DominiosController : ApiController
    {
        public static CrudDominios _Dominios;

        public DominiosController()
        {
            _Dominios = new CrudDominios();
        }

        [HttpGet]
        public async Task<List<Dominios>> Get()
        {
            var respuesta = await _Dominios.Listar();

            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                Ok(respuesta);

                return respuesta;
            }

        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                var result = await _Dominios.Buscar(new Dominios() { _id = ObjectId.Parse(id) });

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
        public async Task<IHttpActionResult> Post([FromBody]Dominios dom)
        {

            //return BadRequest("Ejemplo de error");

            if (dom.descripcion.IsNullOrWhiteSpace() ||
                dom.nombre.IsNullOrWhiteSpace() 
                )
            {
                return BadRequest(string.Format(TitulosPersonalizados.ErrorCamposRequeridos, "Descripcion y Nombre"));
            }

            var consultarDominio = await _Dominios.Buscar(new Dominios() {nombre = dom.nombre});

            if (consultarDominio != null)
            {
                return BadRequest(string.Format(TitulosPersonalizados.ErrorCampoUnico, "Nombre"));
            }

            var respuesta = await _Dominios.InsertarActualizar(dom, null);

            if (respuesta == null)
            {
                return BadRequest(string.Format(TitulosPersonalizados.ErrorInsertar, "el Dominio"));
            }

            return Ok(respuesta);
            
        }

        [HttpPut]
        public async Task<Dominios> Put(string id, [FromBody]Dominios dominio)
        {
            if (id.IsNullOrWhiteSpace() ||
                dominio.descripcion.IsNullOrWhiteSpace() ||
                dominio.nombre.IsNullOrWhiteSpace()
            )
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            var respuesta = await _Dominios.InsertarActualizar(dominio, id);

            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            Ok(respuesta);

            return respuesta;
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string id)
        {
            if (id.IsNullOrWhiteSpace())
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            bool respuesta = await _Dominios.Eliminar(ObjectId.Parse(id));

            if (respuesta == false)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            return Ok(respuesta);

        }
    }
}
