using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiBot.Datos.DTO
{
    public class Respuestas
    {
        public string texto { get; set; }
        public string tipo { get; set; }
        public string[] idopciones { get; set; }
        public string[] idtarjetas { get; set; }
    }
}
