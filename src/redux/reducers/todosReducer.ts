
import * as uuid from 'uuid/v4'

import { type as addTodo, AddTodoAction } from '../actions/addTodo'
import { type as renameTodo } from '../actions/renameTodo'
import { type as toggleTodo } from '../actions/toggleTodo'

import { ActorMap, buildReducer, buildPassThrough } from '../actorMap'
import { Todo } from '../state'

import todoReducer from './todoReducer'

export const INITIAL_STATE: Todo[] = []

const passThrough = buildPassThrough(todoReducer)

const actors: ActorMap<Todo[]> = {
  [addTodo]: (prev, { name, checked = false }: AddTodoAction) => [
    ...prev,
    {
      id: uuid(),
      name,
      checked
    }
  ],
  [renameTodo]: passThrough,
  [toggleTodo]: passThrough
}

export default buildReducer(INITIAL_STATE, actors)
