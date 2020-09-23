using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ApiUsuario.Repositories;
using ApiUsuario.Repositories.Interfaces;
using ApiUsuario.Services;
using ApiUsuario.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ApiUsuario
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(
               options => options.AddPolicy(
                   "AllowAll", p =>
                   {
                       p.AllowAnyOrigin();
                       p.AllowAnyMethod();
                       p.AllowAnyHeader();
                   }));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            //var HOST = "10.11.100.230";
            //var USER = "SYSCOSMOS";
            //var PASS = "COSMOS";
            //services.AddScoped<IDbConnectionFactory>(provider => new SqlConnectionFactory("Usuario", HOST, "COSMOSADF", USER, PASS, 30));

            // Read the connection string from appsettings.
            //string dbConnectionString = this.Configuration.GetConnectionString("Data Source=USUARIO;User Id=SYSTEM;Password=SYSTEMUSER;");


            // Inject IDbConnection, with implementation from SqlConnection class.
            //services.AddScoped<IDbConnection>((sp) => new SqlConnection());
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IUsuarioService, UsuarioService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}