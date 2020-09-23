using ApiUsuario.Models;
using ApiUsuario.ViewModels;
using System.Threading.Tasks;

namespace ApiUsuario.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<UsuarioViewModel> GetAll(int pageIndex, int pageSize);
        Task<Usuario> Get(string id);
        Task<Usuario> GetByName(string name);
        Task<string> Post(Usuario usuario);
        Task<string> Delete(long id);
    }
}