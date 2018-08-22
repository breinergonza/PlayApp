using System;

namespace PlayApp.IC.DTO
{
    [Serializable]
    public class Preguntas
    {
        public string texto { get; set; }
        public bool esCorrecta { get; set; }
    }
}
