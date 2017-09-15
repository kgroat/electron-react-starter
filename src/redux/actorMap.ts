
import { Action, Reducer } from 'redux'

export interface ActorMap<S> {
  [name: string]: Reducer<S>
}

export function buildReducer<S> (initialState: S, map: ActorMap<S>): Reducer<S> {
  return (prev: S = initialState, action: Action): S => {
    let actor = map[action.type]
    return typeof actor === 'function' ? actor(prev, action) : prev
  }
}

export function buildPassThrough<S extends { id: string }> (childReducer: Reducer<S>): Reducer<S[]> {
  return (prev, action: Action & { id: string }) => {
    return prev.map(todo => {
      if (todo.id === action.id) {
        return childReducer(todo, action)
      } else {
        return todo
      }
    })
  }
}
