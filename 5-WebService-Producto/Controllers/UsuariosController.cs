using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using PlayApp.Datos.DAO;
using PlayApp.IC.DTO;
using Microsoft.Ajax.Utilities;
using MongoDB.Bson;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuariosController : ApiController
    {
        public static CrudUsuarios _Usuarios;
        public static MediaTypeHeaderValue mediaType = new MediaTypeHeaderValue("application/json");

        public UsuariosController()
        {
            _Usuarios = new CrudUsuarios();
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {

            var respuesta = await _Usuarios.Listar();

            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                
                return base.Content(HttpStatusCode.OK, respuesta, new JsonMediaTypeFormatter(), mediaType);
            }
            
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                var result = await _Usuarios.Buscar(new Usuarios() { _id = ObjectId.Parse(id) });

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
        public async Task<Usuarios> Post([FromBody]Usuarios usu)
        {
            if (usu.usuario.IsNullOrWhiteSpace() ||
                usu.nombre.IsNullOrWhiteSpace() ||
                usu.claveDinamica.IsNullOrWhiteSpace() ||
                usu.correo.IsNullOrWhiteSpace() 
                )
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            usu.usuario = usu.usuario.ToUpper();

            var  respuesta = await _Usuarios.InsertarActualizar(usu, null);

            if (respuesta == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            Ok(respuesta);
                
            return respuesta;
        }

        [HttpPut]
        public async Task<Usuarios> Put(string id, [FromBody]Usuarios usuario)
        {
            if (id.IsNullOrWhiteSpace() ||
                usuario.usuario.IsNullOrWhiteSpace() ||
                usuario.nombre.IsNullOrWhiteSpace() ||
                usuario.claveDinamica.IsNullOrWhiteSpace() ||
                usuario.correo.IsNullOrWhiteSpace()
            )
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            usuario.usuario = usuario.usuario.ToUpper();

            var respuesta = await _Usuarios.InsertarActualizar(usuario, id);

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

            bool respuesta = await _Usuarios.Eliminar(ObjectId.Parse(id));

            if (respuesta == false)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            return Ok(respuesta);

        }

        //public async Task<bool> ActualizarUsuarios()
        //{
        //    bool esRespuesta = true;

        //    HttpClient client = new HttpClient();

        //    HttpResponseMessage response = client.GetAsync("http://localhost:5462/api/Existe").Result; 

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var usuarios = response.Content.ReadAsAsync<IEnumerable<Usuarios>>().Result;

        //        foreach (var usuario in usuarios)
        //        {
        //            var buscar = _Usuarios.BuscarUsuario(usuario.usuario);

        //            if (buscar == null)
        //            {
        //                var respuesta = await _Usuarios.InsertarActualizar(usuario, null);

        //                Console.Write(respuesta.usuario);
        //            }
        //        }
        //    }
        //    else
        //    {
        //        Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
        //    }

        //    return esRespuesta;
        //}

    }
}