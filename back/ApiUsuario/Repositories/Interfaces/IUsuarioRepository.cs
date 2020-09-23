using ApiUsuario.Models;
using ApiUsuario.ViewModels;
using System.Threading.Tasks;

namespace ApiUsuario.Repositories.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<UsuarioViewModel> GetAll(int pageIndex, int pageSize);
        Task<Usuario> Get(string id);
        Task<Usuario> GetByName(string name);
        //Task<ResponseCluster<IEnumerable<Usuario>>> GetUsuarioList(IEnumerable<int> idList);
        //Task<string> PutUsuario(long id, Usuario usuario);
        Task<string> Post(Usuario usuario);
        //Task<string> PostUsuarioList(IEnumerable<Usuario> usuarioList);
        Task<string> Delete(long id);
        //Task<bool> VerificaUsuario(string login, string senha);
    }
}