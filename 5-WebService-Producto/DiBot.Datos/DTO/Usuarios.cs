using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.ComponentModel.DataAnnotations;

namespace DiBot.Datos.DTO
{
    public class Usuarios
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId _id { get; set; }

        [BsonRequired]
        public string nombre { get; set; }

        [BsonRequired]
        public string usuario { get; set; }

        [BsonRequired]
        public string correo { get; set; }

        [BsonRequired]
        public string claveDinamica { get; set; }

        public string sexo { get; set; }
        
    }
}
