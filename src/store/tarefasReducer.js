import axios from 'axios'
import { mostrarMensagem } from './mensagensReducer'

const http = axios.create({
  baseURL : process.env.REACT_APP_API_BASEURL
})

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE',
  UPDATE_STATUS: 'TAREFAS_UPDATE_STATUS'
}

const ESTADO_INICIAL = {
  tarefas: [],
  quantidade: 0
}

export const tarefaReducer = ( state = ESTADO_INICIAL, action) => {
  switch(action.type){
    case ACTIONS.LISTAR: 
      return {...state, 
        tarefas: action.tarefas, 
        quantidade: action.tarefas.length
      }
    case ACTIONS.ADD:
      const lista =  [...state.tarefas, action.tarefa]
      return {...state, 
        tarefas: lista,
        quantidade: lista.length
      }
    case ACTIONS.REMOVER: 
      const id = action.id;
      const tarefas = state.tarefas.filter( tarefa => tarefa.id !== id )
      return {...state, 
        tarefas: tarefas,
        quantidade: tarefas.length
      }
    case ACTIONS.UPDATE_STATUS: 
      const listaAtualizada = [...state.tarefas]
      listaAtualizada.forEach(tarefa => {
        if( tarefa.id === action.id){
          tarefa.done = true;
        }
      })
      return {...state, tarefas: listaAtualizada}
    default: 
      return state;
  }
}

 
  