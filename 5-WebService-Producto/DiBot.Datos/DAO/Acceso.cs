using PlayApp.IC.Constantes;
using MongoDB.Driver;

namespace PlayApp.Datos.DAO
{
    /// <summary>
    /// Clase para las operaciones con MongoDB
    /// </summary>
    public class Acceso
    {
        /// <summary>
        /// Cliente para la conexion con mongo
        /// </summary>
        /// <returns></returns>
        public static MongoClient GetMongoClient()
        {
            return new MongoClient(Constantes.urlConexionMongo);
        }
        
    }
    
}
