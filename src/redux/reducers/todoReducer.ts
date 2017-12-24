
import {
  renameTodoType, RenameTodoAction,
  toggleTodoType, ToggleTodoAction,
} from 'actions'

import { ActorMap, buildReducer } from '../actorMap'
import { Todo } from '../state'

export const INITIAL_STATE: Todo = {
  id: '',
  name: '',
  checked: false,
}

const actors: ActorMap<Todo> = {
  [renameTodoType]: (prev, { name }: RenameTodoAction) => ({
    ...prev,
    name,
  }),
  [toggleTodoType]: (prev, { checked }: ToggleTodoAction) => ({
    ...prev,
    checked,
  }),
}

export default buildReducer(INITIAL_STATE, actors)
