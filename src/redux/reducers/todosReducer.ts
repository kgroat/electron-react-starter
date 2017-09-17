
import * as uuid from 'uuid/v4'

import {
  addTodoType, AddTodoAction,
  deleteTodoType, DeleteTodoAction,
  renameTodoType,
  toggleTodoType
} from 'actions'

import { ActorMap, buildReducer, buildPassThrough } from '../actorMap'
import { Todo } from '../state'

import todoReducer from './todoReducer'

export const INITIAL_STATE: Todo[] = []

const passThrough = buildPassThrough(todoReducer)

const actors: ActorMap<Todo[]> = {
  [addTodoType]: (prev, { name, checked = false }: AddTodoAction) => [
    ...prev,
    {
      id: uuid(),
      name,
      checked
    }
  ],
  [deleteTodoType]: (prev, { id }: DeleteTodoAction) => 
    prev.filter(todo => todo.id !== id),
  [renameTodoType]: passThrough,
  [toggleTodoType]: passThrough
}

export default buildReducer(INITIAL_STATE, actors)
