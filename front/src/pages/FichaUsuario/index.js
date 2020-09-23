import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import BasicInput from "../../components/BasicInput";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { CLR_STATE as CLR_USUARIO, POST_REQUEST as POST_USUARIO } from "../../store/actions/usuario";
import { REQUEST_SUCCESS } from "../../store/actions";
import { isNumber } from "../../utils/stringTransform";

const FichaUsuario = (props) => {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state);
  const _initFicha = {
    nome: "",
    nomeMae: "",
    dataNascimento: "",
    cpf: "",
    rg: "",

    metaData: null,
  };
  const [ficha, setFicha] = useState({ ..._initFicha });

  const [atualizar, setAtualizar] = useState({
    atualizarPagina: true
  });

  const itemId = props.match.params.id;
  useEffect(() => {
    if(usuario.success_post){
      console.log('teste')
      dispatch({
        type: REQUEST_SUCCESS,
        payload: usuario.msg,
      });
      dispatch({ type: CLR_USUARIO });
      props.history.push("..");
      return undefined;
    }
    var localObj = usuario.usuarios.find(
      (val) => val.cpf + "" === itemId
    );
    var _metadata = null;
    var _dataNascimento='';
    if (localObj) {
      _dataNascimento = localObj.dataNascimento.substring(0,10);
      localObj.dataNascimento = _dataNascimento;
      _metadata = usuario.metaData;
    }
    setFicha({
      ...localObj,
      metaData: _metadata
    });
  }, [usuario]);

  useEffect(() => {
    if(itemId){
      if(itemId === 'adicionar'){
        setFicha({ ..._initFicha }); 
        dispatch({ type: CLR_USUARIO });
        setAtualizar({ atualizarPagina: false });
      }
    }
  }, [dispatch]);


  const verifyForm = useCallback(() => {
    var _payload = {
      chave: isNumber(itemId) ? itemId : 0,
      nome:
        ficha.nome !== "" && ficha.nome !== null
          ? ficha.nome
          : undefined,
      nomeMae:
        ficha.nomeMae !== "" && ficha.nomeMae !== null
          ? ficha.nomeMae
          : undefined,
      cpf: ficha.cpf,
      rg: ficha.rg,
      dataNascimento: ficha.dataNascimento === '' ? undefined : ficha.dataNascimento,
    };
    setFicha({
      ...ficha,
      payload: _payload,
    });
    dispatch({
      type: POST_USUARIO,
      payload: {
        ..._payload,
      },
    });
  }, [dispatch, ficha]);



  return (
    <Container className="pageContainer">
      <Row className="containerHeader">
        <Col md={10}>Ficha do Usuário</Col>
      </Row>
      <Row style={{ paddingTop: 5 }}>
        <Col md={4} />
        <Col md={2}>
          <Button
            onClick={() => {
              setFicha({ ..._initFicha }); 
              dispatch({ type: CLR_USUARIO });
              props.history.goBack();
              if(itemId === 'adicionar'){
                setTimeout(()=>{
                  window.location.reload();
                },500);
              }
            }}
          >
            Voltar
          </Button>
        </Col>
        {/* <Col md={2}>
          <Button onClick={() =>{
             setAtualizar({ atualizarPagina: false });
          }}>
            Atualizar
          </Button>
        </Col> */}
        <Col md={2}>
          <Button
            onClick={() => {
              setFicha({ ..._initFicha }); 
              dispatch({ type: CLR_USUARIO });
              props.history.push("..");
            }}
          >Cancelar</Button>
        </Col>
        <Col md={2}>
          <Button
            onClick={() => {   
              setFicha({ ..._initFicha }); 
              dispatch({ type: CLR_USUARIO });
              //props.history.push(".");
              props.history.push("../ficha/adicionar");
              setAtualizar({ atualizarPagina: false });  
            }}
          >
            <FaPlus style={{ paddingRight: 5 }}/>
            Adicionar
          </Button>
        </Col>
        <Col md={2}>
          <Button
            onClick={() => {
              verifyForm();
            }}
          >Gravar</Button>
        </Col>
      </Row>
      <Row style={{ paddingTop: 10 }}>
        <BasicInput
          title="Nome"
          size={4}
          maxLength={"100"}
          input={["nome", ficha, setFicha]}
          disabled={atualizar.atualizarPagina}
        />
        <BasicInput
          title="CPF"
          size={4}
          maxLength={"100"}
          input={["cpf", ficha, setFicha]}
          disabled={atualizar.atualizarPagina}
        />
        <BasicInput
          title="Data de Nascimento"
          type="date"
          size={3}
          input={["dataNascimento", ficha, setFicha]}
          disabled={atualizar.atualizarPagina}
        />
        <BasicInput
          title="RG"
          size={4}
          maxLength={"100"}
          input={["rg", ficha, setFicha]}
          disabled={atualizar.atualizarPagina}
        />
        <BasicInput
          title="Nome da mãe"
          size={4}
          maxLength={"100"}
          input={["nomeMae", ficha, setFicha]}
          disabled={atualizar.atualizarPagina}
        />
      </Row>
    </Container>
  );
};

export default withRouter(FichaUsuario);