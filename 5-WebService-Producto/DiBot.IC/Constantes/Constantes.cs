using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayApp.IC.Constantes
{
    public class Constantes
    {
        #region "Datos para la conexión con MongoDB"

        //Datos de acceso Azure Cosmo DB - Mongo
        //public const string urlConexionMongo = "mongodb://PlayApp:ZlZJM00MgG3lkSdyLL84ID4jCyQMpEStI934CO0E1e7yMN2xYfvyyFAm9xgA6Z6DFzIbmmLNkrzC1zTdQfkFhg==@PlayApp.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

        public const string urlConexionMongo = "mongodb+srv://administrador:Admin123$@cluster0-2a2tg.gcp.mongodb.net/test?retryWrites=true";

        public const string baseDatosMongo = "bdatos";

        #endregion

        #region "Datos para la conexión con Microsoft Luis"

        public const string LuisAppId = "c902b775-2997-4f68-9c0e-3cdca6bd2d35";

        public const string LuisAPIKey = "8d8683cd8e104dc68a87d08d49f1ee20";

        public const string LuisAPIKeyWestus = "8d8683cd8e104dc68a87d08d49f1ee20";

        public const string LuisAPIHostNameSouth = "westus.api.cognitive.microsoft.com";

        public const string LuisAPIHostNameWestus = "westus.api.cognitive.microsoft.com";

        public const string VersionId = "0.1";

        #endregion

        #region "Datos para el envio de correos"

        public const string MailChimpApiKey = "c66ac47735828f22e924dc6a3e02672f-us18";

        public const string ListId = "d605c43de8";

        public const string correoEnvia = "desarrollo@db-system.com";

        public const string passwordEnvia = "desarroll0";

        public const string correoSoporte = "bgonzalez@db-system.com";

        #endregion

        public const string buenDia = "Buenos días";

        public const string buenasNoches = "Buenas noches";

        public const string buenasTardes = "Buenas tardes";



        public const string coleccionUsuarios = "usuarios";

        public const string coleccionDominios = "dominios";

        public const string coleccionIntenciones = "intenciones";

        public const string coleccionTarjetas = "tarjetas";

        public const string tituloCorreoRecuperacion = "🔑 Restablecer Clave Dinamica - PlayApp 🔑";

        public const string tituloCorreoObservacion = "⚙️ Reporte de Observación - PlayApp ⚙️";        

    }
}
