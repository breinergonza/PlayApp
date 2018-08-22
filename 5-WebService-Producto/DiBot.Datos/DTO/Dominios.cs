using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace DiBot.Datos.DTO
{
    public class Dominios
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId _id { get; set; }

        public string nombre { get; set; }

        public string descripcion { get; set; }
    }
}
