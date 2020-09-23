namespace ApiUsuario.Repositorio.Script
{
    public class UsuarioScript
    {
        public static string Insert { get => @"
            INSERT INTO USUARIO (id,nome,cpf,rg,data_nasc,nome_mae,data_cadastro) 
            SELECT nvl(max(id),0)+1,
                :Nome,
                :Cpf,
                :Rg,
                :DataNascimento,
                :NomeMae,
                SYSDATE
            FROM USUARIO"; }

        public static string Update { get => @"
            UPDATE CARTAO_CORPORATIVO_GASTO
            SET CODIGO = :Codigo,
                DESCRICAO = :Descricao,
                ID_PESSOA = :IdPessoa
            WHERE ID = :Id
            
            Select  CARTAO_CORPORATIVO_GASTO.Id as Id,
                    CODIGO as Codigo,
                    DESCRICAO as Descricao,
                    ID_PESSOA as IdPessoa
            FROM    dbo.CARTAO_CORPORATIVO_GASTO
            where ID = :Id"; }

        public static string Delete { get => @"
            DELETE FROM USUARIO
            where cpf like :query or rg like :query"; }


        public static string Get { get => @"
            SELECT  ID AS Id,
                    Nome AS Nome,
                    CPF AS Cpf,
                    RG AS Rg,
                    DATA_NASC AS DataNascimento,
                    NOME_MAE AS NomeMae
            FROM USUARIO
            where cpf like :query or rg like :query"; }

        public static string GetByName { get => @"
                SELECT  ID AS Id,
                        Nome AS Nome,
                        CPF AS Cpf,
                        RG AS Rg,
                        DATA_NASC AS DataNascimento,
                        NOME_MAE AS NomeMae
                FROM USUARIO
                WHERE NOME LIKE UPPER(:query)"; }

        public static string GetAll { get => @"
            SELECT  ID AS Id,
                    Nome AS Nome,
                    CPF AS Cpf,
                    RG AS Rg,
                    DATA_NASC AS DataNascimento,
                    NOME_MAE AS NomeMae FROM (
                SELECT a.*, ROWNUM rnum FROM (
                SELECT * FROM USUARIO ORDER BY ID
                ) a WHERE ROWNUM <= :PageSize
            ) WHERE rnum > :Offset"; }
        public static string GetAllTotalCount { get => @"
            SELECT  COUNT(*)
            FROM USUARIO"; }
    }
}