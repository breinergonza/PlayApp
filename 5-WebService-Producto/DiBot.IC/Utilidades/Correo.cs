using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using MailChimp.Net;
using MailChimp.Net.Core;
using MailChimp.Net.Models;
using Mandrill;
using Mandrill.Model;

namespace PlayApp.IC.Utilidades
{
    public class Correo
    {
        public bool GenerarClaveCorreo(string correo, string clave)
        {
            bool respuesta = true;

            try
            {
                Task task1 = new Task(() => { EnviarRespuesta(correo, clave); });

                task1.Start();
                
            }
            catch (Exception)
            {
                respuesta = false;
            }
            
            return respuesta;
        }

        public bool GenerarCorreoObservacion(string correo, string observacion)
        {
            bool respuesta = true;

            try
            {
                Task task1 = new Task(() => { EnviarObservacion(correo, observacion); });

                task1.Start();

            }
            catch (Exception)
            {
                respuesta = false;
            }

            return respuesta;
        }

        private static void EnviarRespuesta(string correo, string clave)
        {
            Plantillas pl = new Plantillas();

            EmailModel model = new EmailModel()
            {
                To = correo,
                Email = Constantes.Constantes.correoEnvia,
                Password = Constantes.Constantes.passwordEnvia,
                Subject = Constantes.Constantes.tituloCorreoRecuperacion,
                Body = pl.RecuperarClave(clave)
            };

            using (MailMessage mm = new MailMessage(model.Email, model.To))
            {
                mm.Subject = model.Subject;

                mm.Body = model.Body;
                if (model.Attachment != null)
                {
                    if (model.Attachment.ContentLength > 0)
                    {
                        string fileName = Path.GetFileName(model.Attachment.FileName);
                        mm.Attachments.Add(new Attachment(model.Attachment.InputStream, fileName));
                    }
                }

                mm.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential(model.Email, model.Password);
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(mm);
                }
            }
        }

        //ReporteInconformidad
        private static void EnviarObservacion(string correo, string observacion)
        {
            Plantillas pl = new Plantillas();

            EmailModel model = new EmailModel()
            {
                To = Constantes.Constantes.correoSoporte + "," + correo,
                Email = Constantes.Constantes.correoEnvia,
                Password = Constantes.Constantes.passwordEnvia,
                Subject = Constantes.Constantes.tituloCorreoObservacion,
                Body = pl.ReporteInconformidad(observacion)
            };

            using (MailMessage mm = new MailMessage(model.Email, model.To))
            {
                mm.Subject = model.Subject;

                mm.Body = model.Body;
                if (model.Attachment != null)
                {
                    if (model.Attachment.ContentLength > 0)
                    {
                        string fileName = Path.GetFileName(model.Attachment.FileName);
                        mm.Attachments.Add(new Attachment(model.Attachment.InputStream, fileName));
                    }
                }

                mm.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential(model.Email, model.Password);
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(mm);
                }
            }
        }

    }
}
