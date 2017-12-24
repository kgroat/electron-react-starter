
import { Action, Reducer } from 'redux'

export interface ActorMap<S> {
  [name: string]: Reducer<S>
}

export function buildReducer<S> (initialState: S, map: ActorMap<S>): Reducer<S> {
  return (prev = initialState, action): S => {
    let actor = map[action.type]
    return actor ? actor(prev, action) : prev
  }
}

export function buildPassThrough<S extends { id: string }> (childReducer: Reducer<S>): Reducer<{ [id: string]: S }> {
  return (prev, action: Action & { id: string }) => {
    const { id } = action
    return {
      ...prev,
      [id]: childReducer(prev[id], action),
    }
  }
}
