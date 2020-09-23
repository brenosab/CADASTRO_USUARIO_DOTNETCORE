using ApiUsuario.Models;
using ApiUsuario.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ApiUsuario.Repositorio.Script;
using Oracle.ManagedDataAccess.Client;
using ApiUsuario.ViewModels;
using CartaoCorporativo.ViewModel;

namespace ApiUsuario.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private const int DefaultPageIndex = 1;
        private const int DefaultPageSize = 5;

        IConfiguration _configuration;
        public UsuarioRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection GetConnection()
        {
            var connectionString = _configuration.GetSection("ConnectionStrings").GetSection("EmployeeConnection").Value;
            var conn = new OracleConnection(connectionString);
            return conn;
        }

        public async Task<Usuario> Get(string id)
        {
            try
            {
                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                if (conn.State == ConnectionState.Open)
                {
                    string sql = UsuarioScript.Get;
                    var usuarios = await conn.QueryAsync<Usuario>(sql, new { query = "%" + id + "%" });

                    if (SetEvent(Eventos.GET)) return usuarios.FirstOrDefault();
                }
                return null;
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
                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                if (conn.State == ConnectionState.Open)
                {
                    string sql = UsuarioScript.GetByName;
                    var usuario = await conn.QueryAsync<Usuario>(sql, new { query = "%" + name + "%" });
                    if (SetEvent(Eventos.GET)) return usuario.FirstOrDefault();
                }
                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<string> Post(Usuario usuario)
        {
            try
            {
                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                if (conn.State == ConnectionState.Open)
                {
                    string sql = UsuarioScript.Insert;
                    conn.Execute(sql, new
                    {
                        usuario.Nome,
                        usuario.Cpf,
                        usuario.Rg,
                        usuario.DataNascimento,
                        usuario.NomeMae
                    });

                    if (SetEvent(Eventos.POST)) return ("SUCESSO");
                }
                return null;       
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<string> Delete(long id)
        {
            try
            {
                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                if (conn.State == ConnectionState.Open)
                {
                    if (UsuarioExists(id))
                    {
                        return ("Usuário não encontrado");
                    }
                    string sql = UsuarioScript.Delete;
                    var usuario = await conn.QueryAsync<Usuario>(sql, new { query = "%" + id.ToString() + "%" });
                    if (SetEvent(Eventos.DELETE)) return ("SUCESSO");
                }
                return null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private bool UsuarioExists(long id)
        {
            var conn = this.GetConnection();
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            if (conn.State == ConnectionState.Open)
            {
                return conn.QueryAsync<string>("SELECT ID FROM USUARIO WHERE ID = :Id", new { Id = id }).Result.Any();
            }
            return false;
        }

        private enum Eventos
        {
            POST = 1,
            GET = 2,
            DELETE = 3
        }
        private bool SetEvent(Eventos evento)
        {
            var conn = this.GetConnection();
            var param = new DynamicParameters();
            param.Add(name: "Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            if (conn.State == ConnectionState.Open)
            {
                conn.Execute(@" INSERT INTO EVENTO (id,id_usuario,id_tipo,data_cadastro) select nvl(max(id),0)+1,5,:evento,SYSDATE
                                FROM EVENTO", new { evento });
                return true;
            }
            return false;
        }


        public async Task<UsuarioViewModel> GetAll(int pageIndex, int pageSize)
        {
            try
            {
                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                if (conn.State == ConnectionState.Open)
                {
                    string sqlTotalCount = UsuarioScript.GetAllTotalCount;
                    var totalCount = await conn.QueryAsync<int>(sqlTotalCount);
                    long pageCount = 1;

                    pageIndex = pageIndex == 0 ? DefaultPageIndex : pageIndex;
                    pageSize = pageSize == 0 ? DefaultPageSize : pageSize;
                    pageCount = (totalCount.FirstOrDefault() / pageSize) + ((totalCount.FirstOrDefault() % pageSize) != 0 ? 1 : 0);

                    int offset = pageSize * (pageIndex - 1);
                    int _pageSize = pageSize * pageIndex;
                    
                    MetaData metaData = new MetaData
                    {
                        totalCount = totalCount.FirstOrDefault(),
                        pageNumber = pageIndex == 0 ? 1 : pageIndex,
                        pageCount = pageCount,
                        hasNextPage = ((pageIndex == pageCount) || (pageIndex > pageCount)) ? false : true,
                        hasPreviousPage = ((pageIndex == 1) || (pageIndex > pageCount)) ? false : true
                    };

                    string sql = UsuarioScript.GetAll;
                    var usuarios = await conn.QueryAsync<Usuario>(sql, new { PageSize = _pageSize, Offset = offset });

                    if (SetEvent(Eventos.GET)) return new UsuarioViewModel { Usuarios = usuarios.ToList(), MetaData = metaData };
                }
                return new UsuarioViewModel { };
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}