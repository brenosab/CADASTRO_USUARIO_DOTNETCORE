using ApiUsuario.Models;
using ApiUsuario.Models.Interface;
using ApiUsuario.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiUsuario.Services.Interfaces
{
    public interface IUsuarioService
    {
        //Task<ResponseCluster<IEnumerable<Usuario>>> GetAll(int pageIndex, int pageSize);
        Task<Usuario> Get(int id);
        Task<Usuario> GetByName(string name);
        //Task<ResponseCluster<IEnumerable<Usuario>>> GetUsuarioList(IEnumerable<int> idList);
        //Task<string> PutUsuario(long id, Usuario usuario);
        Task<string> Post(Usuario usuario);
        //Task<string> PostUsuarioList(IEnumerable<Usuario> usuarioList);
        Task<string> Delete(long id);
        //Task<bool> VerificaUsuario(string login, string senha);
    }
}