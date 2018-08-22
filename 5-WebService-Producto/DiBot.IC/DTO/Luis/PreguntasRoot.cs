using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayApp.IC.DTO.Luis
{
    public class PreguntasRoot
    {
        public string text { get; set; }
        public string intentName { get; set; }
        public List<EntityLabel> entityLabels { get; set; }
    }
}
