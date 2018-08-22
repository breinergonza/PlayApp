using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Api.Models
{
    /// <summary>
    /// Clase para la solicitud de datos de acceso
    /// </summary>
    public class Inicio
    {
        [Required]
        [Display(Name = "Usuario")]
        public string usuario { get; set; }

        [Required]
        [Display(Name = "Contraseña")]
        [DataType(DataType.Password)]
        public string password { get; set; }
    }
}