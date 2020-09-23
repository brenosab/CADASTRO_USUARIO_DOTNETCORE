import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { TableBack } from "../../components/Tables";
import {
  FaSearch,
} from "react-icons/fa";
import {
  DO_REQUEST as REQUEST_USUARIO,
  CLR_STATE as CLR_USUARIO,
} from "../../store/actions/usuario";
import { LOGIC_ERROR as SEND_ERROR } from "../../store/actions";
import { withRouter } from "react-router-dom";
import { formataData } from "../../utils/stringTransform";

const Usuario = (props) => {
  const { usuario } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();


  const [query, setQuery] = useState(undefined);
  const pageChanger = useCallback(
    (page) => {
      dispatch({
        type: REQUEST_USUARIO,
        payload: {
          ...query,
          ...{ pageindex: page, pageSize: 5 },
        },
      });
    },
    [query]
  );

  useEffect(() => {
    dispatch({ type: CLR_USUARIO });
    dispatch({
      type: REQUEST_USUARIO,
      payload: {
        ...{ pageindex: 1, pageSize: 5 },
      },
    });
  },[]);
  
  useEffect(() => {
    if (usuario.msg) {
      if (usuario.msg.length > 0) {
        dispatch({
          type: SEND_ERROR,
          payload: usuario.msg,
        });
        dispatch({ type: CLR_USUARIO });
        return;
      }
    }
    if (usuario.success === false) {
      if (usuario.metaData.totalCount === 0) {
        dispatch({
          type: SEND_ERROR,
          payload: "Nenhum bem encontrado",
        });
      }
    }
  }, [usuario, dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        minWidth: 80,
        accessor: "id",
      },
      {
        Header: "Nome",
        minWidth: 220,
        accessor: "nome",
      },
      {
        Header: "CPF",
        minWidth: 160,
        accessor: "cpf",
      },
      {
        Header: "RG",
        minWidth: 160,
        accessor: "rg",
      },
      {
        Header: "Data de Nascimento",
        minWidth: 220,
        accessor: "dataNascimento",
        Cell: ({ value }) => {
          return formataData(value) === "01/01/0001" ? "" : formataData(value);
        },
      },
      {
        Header: "Nome da Mãe",
        minWidth: 200,
        accessor: "nomeMae",
      },
      {
        minWidth: 60,
        id: "inspecionar",
        Cell: ({ row }) => (
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Inspecionar</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                onClick={() =>{
                  props.history.push("./ficha/" + row.original.cpf)}
                }
              >
                <FaSearch />
              </Button>
            </span>
          </OverlayTrigger>
        ),
      },
    ],
    []
  );

  return (
    <Container className="pageContainer">
      <Row className="containerHeader">
        <Col md={10}>Usuários Cadastrados</Col>
        {/* <Col md={{ span: 2 }}>
          <Button
            className="bg-secondary btn-header"
            onClick={useCallback(() => {
              setFilter(_initFilter);
              dispatch({ type: CLR_USUARIO });
            }, [dispatch, _initFilter])}
          >
            <FaEraser style={{ paddingRight: 5 }} />
            Limpar
          </Button>
        </Col> */}
      </Row><br/>
      <Row>
        {/* <Col md={{ span: 2, offset: 10 }} className="col-consulta">
          <Button
            onClick={() => {}}
            className="bg-secondary btn-header"
          >
            <FaSearch style={{ paddingRight: 5 }} />
            Consultar
          </Button>
        </Col> */}
      </Row>
      {usuario.usuarios && usuario.usuarios.length > 0 && (
        <>
          <TableBack
            columns={columns}
            data={usuario.usuarios}
            tableState={usuario.metaData}
            pageChangeHandler={pageChanger}
          />
        </>
      )}
    </Container>
  );
};

export default withRouter(Usuario);
