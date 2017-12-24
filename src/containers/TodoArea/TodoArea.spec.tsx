
import * as React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import { Store, Dispatch } from 'redux'
import { shallow } from 'enzyme'

import { State, Todo, Todos } from 'state'
import TodoInput from 'components/TodoInput'
import TodoList from 'components/TodoList'

import {
  addTodoType, AddTodoAction,
  toggleTodoType, ToggleTodoAction,
  deleteTodoType, DeleteTodoAction,
} from 'actions'

import { TodoAreaBase, Props } from './TodoArea'
import { icon } from './TodoArea.scss'
import TodoArea from './'

let state: State

let dispatch: Dispatch<State> & jest.Mock<any>

const store = {
  getState () {
    return state
  },
  get dispatch () {
    return dispatch as Dispatch<State>
  },
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
} as Store<State>

function resetState () {
  state = {
    todos: {},
  } as State
}

function createTodo (id: string, checked: boolean): Todo {
  return {
    id,
    name: 'Get milk',
    checked,
  }
}

function createTodos (count: number, checked): Todos {
  const todos: Todos = {}
  Array.from(Array(count))
    .map((v, idx) => {
      const id = `${idx}`
      const todo = createTodo(`${idx}`, checked)
      todos[id] = todo
    })

  return todos
}

const defaultProps: Props = {
  todos: {},
  addTodo: jest.fn(),
  toggleTodo: jest.fn(),
  deleteTodo: jest.fn(),
}

describe('<TodoArea />', () => {
  beforeEach(() => {
    resetState()
    dispatch = jest.fn()
  })

  describe('snapshots', () => {
    [1, 2, 3, 4, 5].forEach(i => {
      it(`should render with ${i} unchecked todo items`, () => {
        state.todos = createTodos(i, false)
        const tree = create(
          <Provider store={store}>
            <TodoArea />
          </Provider>,
        )
        expect(tree).toMatchSnapshot()
      })

      it(`should render with ${i} checked todo items`, () => {
        state.todos = createTodos(i, true)
        const tree = create(
          <Provider store={store}>
            <TodoArea />
          </Provider>,
        )
        expect(tree).toMatchSnapshot()
      })
    })

    it('should render without any todo items', () => {
      const tree = create(
        <Provider store={store}>
          <TodoArea />
        </Provider>,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('user adds a todo item', () => {
    it(`should call addTodo once`, () => {
      const addTodo = jest.fn()
      const name = 'Get milk'

      const element = shallow(<TodoAreaBase {...defaultProps} addTodo={addTodo} />)

      element.find(TodoInput).props().onAdd(name, false)

      expect(addTodo).toHaveBeenCalledWith(name, false)
      expect(addTodo).toHaveBeenCalledTimes(1)
    })

    it(`should dispatch an ${addTodoType} action once`, () => {
      const name = 'Get milk'
      const expected: AddTodoAction = {
        type: addTodoType,
        name,
        checked: false,
      }

      const element = shallow(<TodoArea />, { context: { store } })

      element.find(TodoAreaBase).props().addTodo(name, false)

      expect(dispatch).toHaveBeenCalledTimes(1)
      const actual = dispatch.mock.calls[0][0]
      expect(actual).toEqual(expected)
    })
  })

  describe('user checks or unchecks a todo item', () => {
    ['id1', 'id2', 'id3'].map(id => {
      [true, false].map(checked => {
        it(`should call toggleTodo with ${id} and ${checked} once`, () => {
          const toggleTodo = jest.fn()

          const element = shallow(<TodoAreaBase {...defaultProps} toggleTodo={toggleTodo} />)

          element.find(TodoList).props().toggleTodo(id, checked)

          expect(toggleTodo).toBeCalledWith(id, checked)
          expect(toggleTodo).toHaveBeenCalledTimes(1)
        })

        it(`should dispatch a ${toggleTodoType} action with id: ${id} and checked: ${checked} once`, () => {
          state.todos = { [id]: createTodo(id, true) }
          const expected: ToggleTodoAction = {
            type: toggleTodoType,
            id,
            checked,
          }

          const element = shallow(<TodoArea />, { context: { store } })

          element.find(TodoAreaBase).props().toggleTodo(expected.id, expected.checked)

          expect(dispatch).toHaveBeenCalledTimes(1)
          const actual = dispatch.mock.calls[0][0]
          expect(actual).toEqual(expected)
        })
      })
    })
  })

  describe('user deletes a todo item', () => {
    ['id1', 'id2', 'id3'].map(id => {
      it(`should call deleteTodo with ${id} once`, () => {
        const deleteTodo = jest.fn()

        const element = shallow(<TodoAreaBase {...defaultProps} deleteTodo={deleteTodo} />)

        element.find(TodoList).props().deleteTodo(id)

        expect(deleteTodo).toHaveBeenCalledWith(id)
        expect(deleteTodo).toHaveBeenCalledTimes(1)
      })

      it(`should dispatch a ${deleteTodoType} action with id ${id} once`, () => {
        state.todos = { [id]: createTodo(id, false) }
        const expected: DeleteTodoAction = {
          type: deleteTodoType,
          id,
        }

        const element = shallow(<TodoArea />, { context: { store } })

        element.find(TodoAreaBase).props().deleteTodo(id)

        expect(dispatch).toHaveBeenCalledTimes(1)
        const actual = dispatch.mock.calls[0][0]
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('user shows done todos', () => {
    [1, 2, 3, 4, 5].forEach(i => {
      it(`should show ${i} todos if the checkbox remains checked if all are unchecked`, () => {
        const expected = i
        const todos = createTodos(expected, false)
        const element = shallow(<TodoAreaBase {...defaultProps} todos={todos} />)

        const actual = element.find(TodoList).props().items.length
        expect(actual).toBe(expected)
      })

      it(`should 0 todos if all are checked and the checkbox remains checked`, () => {
        const expected = 0
        const todos = createTodos(i, true)
        const element = shallow(<TodoAreaBase {...defaultProps} todos={todos} />)

        const actual = element.find(TodoList).props().items.length
        expect(actual).toBe(expected)
      })

      it(`should show ${i} todos if the checkbox is unchecked even if all are checked`, () => {
        const expected = i
        const todos = createTodos(i, true)
        const element = shallow(<TodoAreaBase {...defaultProps} todos={todos} />)

        element.findWhere(el => el.hasClass(icon)).simulate('click')

        const actual = element.find(TodoList).props().items.length
        expect(actual).toBe(expected)
      })
    })
  })
})
