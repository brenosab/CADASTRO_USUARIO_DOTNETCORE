using ApiUsuario.Repositories.Interfaces;
using System.Threading.Tasks;
using ApiUsuario.Services.Interfaces;
using System;
using ApiUsuario.Models;
using ApiUsuario.ViewModels;

namespace ApiUsuario.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;
        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<UsuarioViewModel> GetAll(int pageIndex, int pageSize)
        {
            try
            {
                return await _repository.GetAll(pageIndex, pageSize);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Usuario> Get(string id)
        {
            try
            {
                return await _repository.Get(id);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<Usuario> GetByName(string name)
        {
            try
            {
                return await _repository.GetByName(name);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<string> Post(Usuario usuario)
        {
            try
            {
                return _repository.Post(usuario);
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public async Task<string> Delete(long id)
        {
            try
            {
                return await _repository.Delete(id);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}