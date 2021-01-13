using HtmlAgilityPack;
using RestSharp;
using SolangeShimada.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SolangeShimada.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {           
            return View(); 
        }

        [HttpPost]
        public JsonResult GetFipe(Fipe fipe)
        {
            System.Net.HttpWebRequest request = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["PathAPI"] + "api/BuscarPorAno");
            request.Method = "POST";
            request.ContentType = "application/json";
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            using (var sw = new StreamWriter(request.GetRequestStream()))
            {
                string json = serializer.Serialize(fipe);
                sw.Write(json);
                sw.Flush();
            }
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            var streamDados = response.GetResponseStream();
            StreamReader reader = new StreamReader(streamDados);
            object objResponse = reader.ReadToEnd();
            streamDados.Close();
            response.Close();
            return Json(objResponse, JsonRequestBehavior.AllowGet);
        }

    }
}