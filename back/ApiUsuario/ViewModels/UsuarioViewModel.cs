using ApiUsuario.Models;
using CartaoCorporativo.ViewModel;
using System.Collections.Generic;

namespace ApiUsuario.ViewModels
{
    public class UsuarioViewModel
    {
        public List<Usuario> Usuarios { get; set; }
        public MetaData MetaData { get; set; }
    }
}