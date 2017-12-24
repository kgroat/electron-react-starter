
import * as deepFreeze from 'deep-freeze'

import renameTodo, { type as RENAME_TODO } from '../../actions/renameTodo'
import toggleTodo, { type as TOGGLE_TODO } from '../../actions/toggleTodo'
import addTodo, { type as ADD_TODO } from '../../actions/addTodo'

import { Todo, Todos } from '../../state'

import todosReducer, { INITIAL_STATE } from '../todosReducer'

const originalName = 'some name'

const makeToggle = (idx: number): Todo => ({
  id: `some id ${idx}`,
  name: originalName,
  checked: false,
})

const initializeState = (count: number) => {
  const output: Todos = {}

  Array.from(Array(count))
    .map((v, i) => {
      const todo = makeToggle(i)
      output[todo.id] = todo
    })

  return deepFreeze(output)
}

describe('todosReducer', () => {
  describe('initialize', () => {
    it('should return initial state to an uninitialized call', () => {
      const actual = todosReducer(undefined as any, { type: 'initialize' })
      const expected = INITIAL_STATE

      expect(actual).toBe(expected)
    })
  })

  describe(RENAME_TODO, () => {
    let state: Todos = initializeState(4)
    beforeEach(() => state = initializeState(4))

    Object.keys(state).forEach(id => {
      if ((state as object).hasOwnProperty(id)) {
        const item = state[id]
        it('should rename the chosen todo', () => {
          const expected = 'new name'
          const mutated = todosReducer(state, renameTodo({
            id: id,
            name: expected,
          }))

          const actual = mutated[id]
          expect(actual && actual.name).toBe(expected)
        })

        it('should not rename other todos', () => {
          const expected = originalName

          const mutated = todosReducer(state, renameTodo({
            id: item.id,
            name: 'new name',
          }))

          Object.keys(mutated).forEach(otherId => {
            if (otherId === id) {
              return
            }
            const actual = mutated[otherId]
            expect(actual.name).toBe(expected)
          })
        })
      }
    })
  })

  describe(TOGGLE_TODO, () => {
    let state = initializeState(4)
    beforeEach(() => state = initializeState(4))

    Object.keys(state).forEach(id => {
      const item = state[id]

      it('should toggle the chosen todo', () => {
        const expected = true
        const mutated = todosReducer(state, toggleTodo({
          id: item.id,
          checked: expected,
        }))

        const actual = mutated[id]
        expect(actual && actual.checked).toBe(expected)
      })

      it('should not toggle other todos', () => {
        const expected = false
        const mutated = todosReducer(state, toggleTodo({
          id: item.id,
          checked: true,
        }))

        Object.keys(mutated).forEach(otherId => {
          if (otherId === id) {
            return
          }
          const actual = mutated[otherId]
          expect(actual.checked).toBe(expected)
        })
      })
    })
  })

  describe(ADD_TODO, () => {
    [0, 1, 2, 3].forEach(count => {
      let state = initializeState(count)
      it('should add one todo', () => {
        const expected = count + 1
        const actual = todosReducer(state, addTodo({
          name: originalName,
        }))

        expect(Object.keys(actual).length).toBe(expected)
      })
    })

    it('should create a todo with the chosen name', () => {
      const expected = 'some new name'

      const actual = todosReducer({}, addTodo({
        name: expected,
      }))

      const ids = Object.keys(actual)
      expect(ids.length).toBe(1)
      const [ id ] = ids

      expect(actual[id].name).toBe(expected)
    })
  })
})
