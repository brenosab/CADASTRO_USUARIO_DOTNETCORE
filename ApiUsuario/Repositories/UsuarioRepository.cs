using ApiUsuario.Models;
using ApiUsuario.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ApiUsuario.Repositorio.Script;
using ApiUsuario.Exceptions;
using System.Data.SqlClient;
using Oracle.ManagedDataAccess.Client;
using ApiUsuario.Oracle;

namespace ApiUsuario.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private const int DefaultPageIndex = 1;
        private const int DefaultPageSize = 10;

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

        public async Task<Usuario> Get(int id)
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
                    var usuarios = await conn.QueryAsync<Usuario>(sql, new { query = "%" + id.ToString() + "%" });

                    if (SetEvent(Eventos.GET)) return usuarios.FirstOrDefault();
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
                    string sql = UsuarioScript.Get;
                    var usuario = await conn.QueryAsync<Usuario>(sql, new { query = "UPPER(%" + name + "%)" });
                    if (SetEvent(Eventos.GET)) return usuario.FirstOrDefault();
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


        //public async Task<ResponseCluster<IEnumerable<Usuario>>> GetAll(int pageIndex, int pageSize)
        //{
        //    try
        //    {

        //        pageSize = pageSize == 0 ? DefaultPageSize : pageSize;
        //        pageIndex = pageIndex == 0 ? DefaultPageIndex : pageIndex;

        //        var usuarios = await _context.Usuario.ToPagedListAsync(pageIndex, pageSize);
        //        var count = usuarios.TotalItemCount;

        //        return new ResponseCluster<IEnumerable<Usuario>>() { objValue = usuarios, totalItemCount = count };
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        //public async Task<string> PutUsuario(long id, Usuario usuario)
        //{
        //    try
        //    {
        //        if (!_context.Database.CanConnect()) { throw new ApiException(ApiException.ApiExceptionReason.DB_CONNECTION_NOT_COMPLETED, "Não foi possível abrir conexão com banco de dados"); }

        //        _context.Entry(usuario).State = EntityState.Modified;

        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!UsuarioExists(id))
        //            {
        //                throw new Exception("Usuário não encontrado");
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return string.Empty;
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        //public async Task<string> PostUsuarioList(IEnumerable<Usuario> usuarioList)
        //{
        //    try
        //    {
        //        if (!_context.Database.CanConnect()) { throw new ApiException(ApiException.ApiExceptionReason.DB_CONNECTION_NOT_COMPLETED, "Não foi possível abrir conexão com banco de dados"); }

        //        _context.Usuario.AddRange(usuarioList);
        //        await _context.SaveChangesAsync();              
                
        //        return string.Empty;
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        //public async Task<string> DeleteUsuario(long id)
        //{
        //    try
        //    {
        //        if (!_context.Database.CanConnect()) { throw new ApiException(ApiException.ApiExceptionReason.DB_CONNECTION_NOT_COMPLETED, "Não foi possível abrir conexão com banco de dados"); }

        //        var usuario = await _context.Usuario.FindAsync(id);
        //        if (usuario == null)
        //        {
        //            throw new Exception("Usuário não encontrado");
        //        }
        //        _context.Usuario.Remove(usuario);
        //        await _context.SaveChangesAsync();

        //        return string.Empty;
        //    }
        //    catch(Exception e)
        //    {
        //        throw e;
        //    }
        //}

        //public async Task<bool> VerificaUsuario(string login, string senha)
        //{
        //    try
        //    {
        //        var usuario = await _context.Usuario
        //           .Select(b => b)
        //           .Where(b => b.NomeLogin == login)
        //           .SingleOrDefaultAsync();

        //        byte[] bytes = Encoding.UTF8.GetBytes(senha);
        //        var sha1 = SHA512.Create();
        //        byte[] hashBytes = sha1.ComputeHash(bytes);

        //        bool result = false;
        //        if(hashBytes.SequenceEqual(usuario.SenhaLogin))
        //        {
        //            result = true;
        //        }

        //        return result;
        //    }
        //    catch(Exception e)
        //    {
        //        throw e;
        //    }
        //}

       
    }
}