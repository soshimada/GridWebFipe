using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SolangeShimada.Models
{
    public class Fipe
    {
        public string Codigo { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Ano { get; set; }
        public decimal Preco { get; set; }
        public decimal PrecoMedia { get; set; }
    }
}