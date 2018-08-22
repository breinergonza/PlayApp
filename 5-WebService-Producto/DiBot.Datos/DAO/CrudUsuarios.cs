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
    public class CrudUsuarios
    {

        /// <summary>
        /// Metodo que permite la busqueda de un usuario a partir de su usuario o correo
        /// </summary>
        /// <param name="datos">Usuario o correo que se va a consultar</param>
        /// <returns>Listado de usuarios que cumplen </returns>
        public Usuarios BuscarUsuario(string datos)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

            var builder = Builders<Usuarios>.Filter;
            var query = builder.Eq("usuario", datos.ToUpper()) | builder.Eq("correo", datos) | builder.Eq("nombre", datos);
            List<Usuarios> result = obj.Find(query).ToList();

            Usuarios respuesta = null;

            if (result != null)
            {
                respuesta = result.FirstOrDefault();
            }

            return respuesta;
        }

        /// <summary>
        /// Metodo que permite la busqueda de un usuario a partir de su nombre y su contraseña
        /// </summary>
        /// <param name="nombre"></param>
        /// <param name="clave"></param>
        /// <returns></returns>
        public Usuarios BuscarUsuarioClave(string nombre, string clave)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

            var builder = Builders<Usuarios>.Filter;
            var query = builder.Eq("nombre", nombre) & builder.Eq("claveDinamica", clave);
            List<Usuarios> result = obj.Find(query).ToList();

            Usuarios respuesta = null;

            if (result != null)
            {
                respuesta = result.FirstOrDefault();
            }

            return respuesta;
        }

        public string ActualizarUsuarioClave(Usuarios usu)
        {
            string clave;
            int longitud = 4;

            string caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < longitud--)
            {
                res.Append(caracteres[rnd.Next(caracteres.Length)]);
            }

            clave = res.ToString();

            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

            var builder = Builders<Usuarios>.Filter;
            var query = builder.Eq("_id", usu._id);

            var resultaa = obj.FindOneAndUpdate(query,
                Builders<Usuarios>.Update.Set("claveDinamica", clave));

            return clave;

        }

        /// <summary>
        /// Devuelve un listado asincrono de usuarios
        /// </summary>
        /// <returns></returns>
        public async Task<List<Usuarios>> Listar()
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);
            
            return await obj.Find(_ => true).ToListAsync(); ;
        }

        /// <summary>
        /// Buscar el usuario a partir de su Id
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public async Task<Usuarios> Buscar(Usuarios usuario)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

            var builder = Builders<Usuarios>.Filter;
            var query = builder.Eq("_id", usuario._id);

            return await obj.Find(query).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Metodo que inserta o actualiza un usuario en base de datos
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Usuarios> InsertarActualizar(Usuarios usuario, string id)
        {
            MongoClient client = Acceso.GetMongoClient();
            IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
            IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

            if (id == null)
            {
                await obj.InsertOneAsync(usuario);
                return usuario ;
            }
            else
            {
                var options = new FindOneAndReplaceOptions<Usuarios>
                {
                    ReturnDocument = ReturnDocument.After
                };

                usuario._id = ObjectId.Parse(id);

                return await obj.FindOneAndReplaceAsync<Usuarios>(u => u._id == ObjectId.Parse(id), usuario, options);
                
            }
        }

        public async Task<bool> Eliminar(ObjectId id)
        {
            bool respuesta = false;

            try
            {
                MongoClient client = Acceso.GetMongoClient();
                IMongoDatabase db = client.GetDatabase(Constantes.baseDatosMongo);
                IMongoCollection<Usuarios> obj = db.GetCollection<Usuarios>(Constantes.coleccionUsuarios);

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
