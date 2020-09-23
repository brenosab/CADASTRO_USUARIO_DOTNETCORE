using ApiUsuario.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiUsuario.Services.Interfaces;
using System;
using ApiUsuario.Models.Interface;
using ApiUsuario.ViewModels;
using ApiUsuario.Models;

namespace ApiUsuario.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;
        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        //public async Task<ResponseCluster<IEnumerable<Usuario>>> GetAll(int pageIndex, int pageSize)
        //{
        //    try
        //    {
        //        return await _repository.GetAll(pageIndex, pageSize);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public Task<Usuario> Get(int id)
        {
            try
            {
                return _repository.Get(id);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Task<Usuario> GetByName(string name)
        {
            try
            {
                return _repository.GetByName(name);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //public Task<ResponseCluster<IEnumerable<Usuario>>> GetUsuarioList(IEnumerable<int> idList)
        //{
        //    try
        //    {
        //        return _repository.GetUsuarioList(idList);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        //public Task<string> PutUsuario(long id, Usuario usuario)
        //{
        //    try
        //    {
        //        return _repository.PutUsuario(id, usuario);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
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
        //public Task<string> PostUsuarioList(IEnumerable<Usuario> usuarioList)
        //{
        //    try
        //    {
        //        return _repository.PostUsuarioList(usuarioList);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public Task<string> Delete(long id)
        {
            try
            {
                return _repository.Delete(id);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        //public Task<bool> VerificaUsuario(string login, string senha)
        //{
        //    try
        //    {
        //        return _repository.VerificaUsuario(login, senha);
        //    }
        //    catch(Exception e)
        //    {
        //        throw e;
        //    }
        //}

    }
}