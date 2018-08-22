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
    public class Intenciones
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId _id { get; set; }

        public string intencion { get; set; }

        public string[] preguntas { get; set; }

        public string dominio { get; set; }

        public List<Respuestas> respuestas { get; set; }

    }
}
