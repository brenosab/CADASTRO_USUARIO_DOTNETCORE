import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'idFilial', label: 'Loja', minWidth: 80 },
  { 
    id: 'dataSolicitacao',
    label: 'Data Solicitação',
    minWidth: 80,
    format: value => formataData(value),
  },
  {
    id: 'idProduto',
    label: 'Código Produto',
    minWidth: 80,
  },
  {
    id: 'descProduto',
    label: 'Descrição Produto',
    minWidth: 200,
  },
  {
    id: 'quantidadeSolicitada',
    label: 'Qtd. Produto',
    minWidth: 80,
  },
  {
    id: 'quantidadeAprovada',
    label: 'Qtd. Aprovada',
    minWidth: 80,
  },
  {
    id: 'idUsuarioSolicitante',
    label: 'Usuário',
    minWidth: 80,
  },
];

function formataData(data){
  var dia = data.substring(8,10);
  var mes = data.substring(5,7);
  var ano = data.substring(0,4);

  var _data = dia + '/' + mes + '/' + ano;
  return _data;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

const StickyHeadTable = (props) => {
  const classes = useStyles();
  const {arrayRow, page, rowsPerPage, setPage, setRowsPerPage, count } = props;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  /*
  useEffect(() => {
    console.log('arrayRow');
    console.log(arrayRow);
    console.log(count);
  }, [arrayRow]);
*/
  return (
  <>
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table"  style={{position:"relative", height:"50"}}>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={"left"}
                    style={{ minWidth: column.minWidth }}
                  >
                  {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {arrayRow.map(row =>{
                return(
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    return(
                    <TableCell key={column.id} align={"left"}>
                      {column.format ? column.format(row[column.id]) : row[column.id]}
                    </TableCell>)
                  })}
                </TableRow>)
              })}
              {/*
              arrayRow.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={"left"}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
              */
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10,20,30,100]}
          component="div"
          count={count} // Não é isso
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
  </>
  );
}

export default StickyHeadTable;