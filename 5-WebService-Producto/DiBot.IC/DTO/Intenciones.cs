using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Collections.Generic;

namespace PlayApp.IC.DTO
{
    public class Intenciones
    {

        public Intenciones()
        {
            preguntas = new List<Preguntas>();
        }

        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId _id { get; set; }

        public string idluis { get; set; }

        public string dominio { get; set; }

        public string intencion { get; set; }
        
        public List<Preguntas> preguntas { get; set; }
        
    }
}
