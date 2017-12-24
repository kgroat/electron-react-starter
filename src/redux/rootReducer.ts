
import { combineReducers } from 'redux'

import { State } from './state'
import todos, { INITIAL_STATE as TODOS } from './reducers/todosReducer'

export const INITIAL_STATE: State = {
  todos: TODOS,
}

export default combineReducers<State>({
  todos,
})
