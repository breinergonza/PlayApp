using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlayApp.IC.DTO;
using PlayApp.IC.Constantes;
using MongoDB.Bson;
using MongoDB.Driver;

namespace PlayApp.Datos.DAO
{
    /// <summary>
    /// Clase desde donde se realizan los CRUD para la colección de Dominios
    /// </summary>
    public class CrudDominios
    {

        /// <summary>
        /// Listado de dominios
        /// </summary>
        /// <returns></returns>
        public List<Dominios> lstDominios()
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Dominios> obj = db.GetCollection<Dominios>(Constantes.coleccionDominios);

            IList<Dominios> lst = obj.Find<Dominios>(new BsonDocument()).ToList();

            return lst.ToList();
        }

        /// <summary>
        /// Devuelve un listado asincrono de dominios
        /// </summary>
        /// <returns></returns>
        public async Task<List<Dominios>> Listar()
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Dominios> obj = db.GetCollection<Dominios>(Constantes.coleccionDominios);

            return await obj.Find(_ => true).ToListAsync(); ;
        }

        /// <summary>
        /// Buscar un dominio a partir de su Id o de su nombre
        /// </summary>
        /// <param name="dominio"></param>
        /// <returns></returns>
        public async Task<Dominios> Buscar(Dominios dominio)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Dominios> obj = db.GetCollection<Dominios>(Constantes.coleccionDominios);

            var builder = Builders<Dominios>.Filter;
            var query = builder.Eq("_id", dominio._id) | builder.Eq("nombre", dominio.nombre);

            return await obj.Find(query).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Metodo que inserta o actualiza un usuario en base de datos
        /// </summary>
        /// <param name="dominio"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Dominios> InsertarActualizar(Dominios dominio, string id)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Dominios> obj = db.GetCollection<Dominios>(Constantes.coleccionDominios);

            if (id == null)
            {
                await obj.InsertOneAsync(dominio);
                return dominio;
            }
            else
            {
                var options = new FindOneAndReplaceOptions<Dominios>
                {
                    ReturnDocument = ReturnDocument.After
                };

                dominio._id = ObjectId.Parse(id);

                return await obj.FindOneAndReplaceAsync<Dominios>(u => u._id == ObjectId.Parse(id), dominio, options);

            }
        }

        public async Task<bool> Eliminar(ObjectId id)
        {
            bool respuesta = false;

            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Dominios> obj = db.GetCollection<Dominios>(Constantes.coleccionDominios);

                DeleteResult result = await obj.DeleteOneAsync(m => m._id == id);

                if (result.DeletedCount > 0)
                {
                    respuesta = true;
                }

            }
            catch (Exception)
            {
                respuesta = false;
            }

            return respuesta;
        }

    }
}
