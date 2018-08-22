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
    public class CrudIntenciones
    {
        /// <summary>
        /// Metodo para buscar una intencion a partir de su identificador
        /// o intencion
        /// </summary>
        /// <param name="intencion"></param>
        /// <returns></returns>
        public async Task<Intenciones> BuscarIntencion(string intencion)
        {
            Intenciones respuesta = null;

            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

                var builder = Builders<Intenciones>.Filter;
                var query = builder.Eq("intencion", intencion.ToLower());
                respuesta = await obj.Find(query).FirstOrDefaultAsync();
               
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return respuesta;
        }

        /// <summary>
        /// Metodo que busca si una pregunta existe
        /// </summary>
        /// <param name="pregunta"></param>
        /// <returns></returns>
        public async Task<Intenciones> BuscarPregunta(Preguntas pregunta)
        {
            Intenciones respuesta = null;

            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

                var builder = Builders<Intenciones>.Filter;
                var query = builder.Eq("preguntas.texto", pregunta.texto.ToLower());
                respuesta = await obj.Find(query).FirstOrDefaultAsync();

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return respuesta;
        }


        /// <summary>
        /// Devuelve un listado asincrono de intenciones
        /// </summary>
        /// <returns></returns>
        public async Task<List<Intenciones>> Listar()
        {
            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

                return await obj.Find(_ => true).ToListAsync(); ;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
           
        }

        /// <summary>
        /// Buscar el intencion a partir de su Id
        /// </summary>
        /// <param name="intencion"></param>
        /// <returns></returns>
        public async Task<Intenciones> Buscar(Intenciones intencion)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

            var builder = Builders<Intenciones>.Filter;
            var query = builder.Eq("_id", intencion._id);

            return await obj.Find(query).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Metodo que inserta o actualiza un intencion en base de datos
        /// </summary>
        /// <param name="intencion"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Intenciones> InsertarActualizar(Intenciones intencion, string id)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

            if (id == null)
            {
                await obj.InsertOneAsync(intencion);
                return intencion;
            }
            else
            {
                var options = new FindOneAndReplaceOptions<Intenciones>
                {
                    ReturnDocument = ReturnDocument.After
                };

                intencion._id = ObjectId.Parse(id);

                return await obj.FindOneAndReplaceAsync<Intenciones>(u => u._id == ObjectId.Parse(id), intencion, options);

            }
        }

        public async Task<bool> Eliminar(ObjectId id)
        {
            bool respuesta = false;

            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Intenciones> obj = db.GetCollection<Intenciones>(Constantes.coleccionIntenciones);

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
