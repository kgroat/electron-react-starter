
import * as deepFreeze from 'deep-freeze'

import renameTodo, { type as RENAME_TODO } from '../../actions/renameTodo'
import toggleTodo, { type as TOGGLE_TODO } from '../../actions/toggleTodo'

import todoReducer, { INITIAL_STATE } from '../todoReducer'

describe('todoReducer', () => {
  describe('initialize', () => {
    it('should return initial state to an uninitialized call', () => {
      const actual = todoReducer(undefined as any, { type: 'initialize' })
      const expected = INITIAL_STATE

      expect(actual).toBe(expected)
    })
  })

  describe(RENAME_TODO, () => {
    [
      'newname',
      'another name',
      'fake todo',
    ].forEach(name => {
      it(`should change name to '${name}'`, () => {
        const id = 'fakeid'

        const actual = todoReducer(deepFreeze({
          id,
          name: 'fakename',
          checked: false,
        }), renameTodo({
          id,
          name,
        }))

        expect(actual.name).toBe(name)
      })
    })
  })

  describe(TOGGLE_TODO, () => {
    it('should set checked to false', () => {
      const id = 'fakeid'
      const expected = false

      const actual = todoReducer(deepFreeze({
        id,
        name: 'fakename',
        checked: !expected,
      }), toggleTodo({
        id,
        checked: expected,
      }))

      expect(actual.checked).toBe(expected)
    })

    it('should set checked to true', () => {
      const id = 'fakeid'
      const expected = true

      const actual = todoReducer(deepFreeze({
        id,
        name: 'fakename',
        checked: !expected,
      }), toggleTodo({
        id,
        checked: expected,
      }))

      expect(actual.checked).toBe(expected)
    })
  })
})
