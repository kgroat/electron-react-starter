
import * as uuid from 'uuid/v4'

import {
  addTodoType, AddTodoAction,
  deleteTodoType, DeleteTodoAction,
  renameTodoType,
  toggleTodoType,
} from 'actions'

import { ActorMap, buildReducer, buildPassThrough } from '../actorMap'
import { Todos } from '../state'

import todoReducer from './todoReducer'

export const INITIAL_STATE: Todos = {}

const passThrough = buildPassThrough(todoReducer)

const actors: ActorMap<Todos> = {
  [addTodoType]: (prev, { name, checked = false }: AddTodoAction) => {
    const id = uuid()

    return {
      ...prev,
      [id]: {
        id,
        name,
        checked,
      },
    }
  },
  [deleteTodoType]: (prev, { id }: DeleteTodoAction) => {
    const output = {
      ...prev,
    }

    delete output[id]

    return output
  },
  [renameTodoType]: passThrough,
  [toggleTodoType]: passThrough,
}

export default buildReducer(INITIAL_STATE, actors)
