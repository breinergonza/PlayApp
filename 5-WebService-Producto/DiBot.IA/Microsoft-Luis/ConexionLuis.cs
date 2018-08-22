using System;
using System.Collections.Generic;
using DiBot.IC.DTO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using DiBot.IC.Constantes;
using DiBot.IC.DTO.Luis;

namespace DiBot.IA
{
    public class ConexionLuis
    {
        #region Operaciones con Intenciones

        /// <summary>
        /// Metodo que recibe una pregunta y devuelve la intencion de esa pregunta
        /// </summary>
        /// <param name="consulta">Pregunta a ser consultada</param>
        /// <returns></returns>
        public static async Task<string> ConsultarIntent(string consulta)
        {
            string respuesta = "";

            try
            {
                var client = new HttpClient();
                var queryString = HttpUtility.ParseQueryString(string.Empty);

                var luisAppId = Constantes.LuisAppId;
                var subscriptionKey = Constantes.LuisAPIKey;
                var domain = Constantes.LuisAPIHostNameSouth;

                client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

                queryString["q"] = consulta;

                // Parametros Opcionales
                queryString["timezoneOffset"] = "0";
                queryString["verbose"] = "true";
                queryString["spellCheck"] = "false";
                queryString["staging"] = "false";

                var uriNew = $"https://{domain}/luis/v2.0/apps/{luisAppId}?{queryString}";

                var response = await client.GetAsync(uriNew);

                //Se obtienen los datos desde Luis con la intensión.
                var strResponseContent = await response.Content.ReadAsStringAsync();

                LuisObject respuestaLuisObject = new JavaScriptSerializer().Deserialize<LuisObject>(strResponseContent);

                if (respuestaLuisObject != null)
                {
                    respuesta = respuestaLuisObject.topScoringIntent.intent;
                }
            }
            catch (Exception)
            {
                //Alguna excepcion aquí...
                throw;
            }

            return respuesta;
        }

        #endregion

        #region Operaciones con Intenciones

        /// <summary>
        /// Metodo que permite la inserción de una intención en Luis
        /// </summary>
        /// <param name="intension"></param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> CrearIntencion(string intension)
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;
            
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/intents?{queryString}";
            
            HttpResponseMessage response;

            var ser = new JavaScriptSerializer().Serialize(new BodyIntencion() { name = intension });

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes(ser);

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(uriNew, content);
            }

            return response;
        }

        /// <summary>
        /// Metodo que permite actualizar una intención en Luis
        /// </summary>
        /// <param name="intentId"></param>
        /// <param name="nuevoNombre"></param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> ActualizarIntencion(string intentId, string nuevoNombre)
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
            
            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/intents/{intentId}?{queryString}";

            HttpResponseMessage response;

            var ser = new JavaScriptSerializer().Serialize(new BodyIntencion() { name = nuevoNombre });

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes(ser);

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PutAsync(uriNew, content);
            }

            return response;
        }

        public async Task<HttpResponseMessage> EliminarIntencion(string intentId)
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            // Request parameters
            queryString["deleteUtterances"] = "false";
            
            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/intents/{intentId}?{queryString}";

            var response = await client.DeleteAsync(uriNew);

            return response;
        }

        #endregion

        #region Operaciones con Preguntas

        /// <summary>
        /// Metodo que toma un listado de preguntas y los inserta en Luis
        /// </summary>
        /// <param name="listadoPreguntas"></param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> InsertarPreguntas(List<PreguntasRoot> listadoPreguntas)
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/examples?{queryString}";
            
            HttpResponseMessage response;

            var ser = new JavaScriptSerializer().Serialize(listadoPreguntas);

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes(ser);

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(uriNew, content);
            }

            return response;
        }

        /// <summary>
        /// Metodo que elimina un pregunta en Luis
        /// </summary>
        /// <param name="idPreguntaLuis"></param>
        /// <returns></returns>
        public async Task<HttpResponseMessage> EliminarPregunta(string idPreguntaLuis)
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
            
            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/examples/{idPreguntaLuis}?{queryString}";

            var response = await client.DeleteAsync(uriNew);

            return response;
        }

        #endregion


        #region Operaciones de Entrenamiento

        public async Task<HttpResponseMessage> EntrenarModelo()
        {
            var luisAppId = Constantes.LuisAppId;
            var subscriptionKey = Constantes.LuisAPIKeyWestus;
            var domain = Constantes.LuisAPIHostNameWestus;
            var versionId = Constantes.VersionId;

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            var uriNew = $"https://{domain}/luis/api/v2.0/apps/{luisAppId}/versions/{versionId}/train?{queryString}";

            HttpResponseMessage response;

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes("{}");

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(uriNew, content);
            }

            return response;
        }

        #endregion

        class BodyIntencion
        {
            public string name { get; set; }
        }


    }
}