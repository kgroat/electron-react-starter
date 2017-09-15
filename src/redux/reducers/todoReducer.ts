
import { type as renameTodo, RenameTodoAction } from '../actions/renameTodo'
import { type as toggleTodo, ToggleTodoAction } from '../actions/toggleTodo'

import { ActorMap, buildReducer } from '../actorMap'
import { Todo } from '../state'

export const INITIAL_STATE: Todo = null

const actors: ActorMap<Todo> = {
  [renameTodo]: (prev, { name }: RenameTodoAction) => ({
    ...prev,
    name
  }),
  [toggleTodo]: (prev, { checked }: ToggleTodoAction) => ({
    ...prev,
    checked
  })
}

export default buildReducer(INITIAL_STATE, actors)
