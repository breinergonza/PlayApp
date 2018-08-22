using System;

namespace PlayApp.IC.DTO
{
    public class ContenidoCorreo
    {        
        public string email { get; set; }

        public string asunto { get; set; }

        public string mensaje { get; set; }

        public static ContenidoCorreo Parse(dynamic o)
        {
            try
            {
                return new ContenidoCorreo
                {
                    email = o.email.ToString(),                    
                    mensaje = o.mensaje.ToString()
                };
            }
            catch
            {
                throw new InvalidCastException("Contenido del correo no pudo ser leido.");
            }
        }
    }
}
