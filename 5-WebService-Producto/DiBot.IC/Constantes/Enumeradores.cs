using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls.WebParts;

namespace PlayApp.IC.Constantes
{
    public class Enumeradores
    {
        public enum HorarioEnum { AM, PM };

        public enum ColeccionesEnum
        {
            usuarios,
            dominios,
            intensiones
        };

        public enum CondicionEnum
        {
            Si,
            No
        };

        public enum TiposRespuestasEnum
        {
            [Description("Básica")]
            Basica,

            [Description("Con Opciones")]
            ConOpciones,

            [Description("Tarjeta")]
            Tarjeta,

            [Description("TarjetaBasica")]
            TarjetaBasica,

            [Description("Listado de Tarjetas")]
            ListaTarjetas,

            [Description("Tarjeta de Video")]
            TarjetaVideo,

            [Description("Tarjeta de Audio")]
            TarjetaAudio
        }

    }
}
