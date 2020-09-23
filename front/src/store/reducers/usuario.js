  import {
    GET_REQUEST_SUCCESS,
    CLR_STATE,
    POST_REQUEST_SUCCESS
  } from "../actions/usuario";

  const _initState = {
    success: undefined,
    success_post: undefined,
    msg: [],
  
    usuarios: [],
    metaData: null,
  };
  
  export const usuario = (state, action) => {
    if (state === undefined) {
      state = { ..._initState };
    }  
    switch (action.type) {
      case GET_REQUEST_SUCCESS:
        return setBensUsuarios(action,state);
      case CLR_STATE:
        return { ..._initState };
      case POST_REQUEST_SUCCESS:
        return postBemUsuario(action,state);
      default:
        return state;
    }
  };
  
  const postBemUsuario = (action,state) => {
    return {
      ..._initState,
      success_post: true,
      msg: action.payload,
    }
  }

  const setBensUsuarios = (action,state) => {
    var _state = true;
    if (Array.isArray(action.payload.usuarios)) {
      if(action.payload.metaData.totalCount === 0) _state = false;
      return {
        ..._initState,
        success: _state,
        usuarios: action.payload.usuarios,
        metaData: action.payload.metaData,
      };
    }
     else {
      return {
        ...state,
        success: _state,
        usuarios: [action.payload],
      };
    }
  };