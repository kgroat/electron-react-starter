
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { Todo } from 'state'
import TodoItem from 'components/TodoItem'
import TodoList from './'

function createTodo (id: string, checked: boolean): Todo {
  return {
    id,
    name: 'Get milk',
    checked,
  }
}

function createTodos (count: number, checked): Todo[] {
  return Array.from(Array(count))
    .map((v, idx) => createTodo(`${idx}`, checked))
}

describe('<TodoList />', () => {
  describe('snapshots', () => {
    [0, 1, 2, 3, 4].forEach(i => {
      it(`should render correctly with ${i} unchecked todos`, () => {
        const todos = createTodos(i, false)
        const tree = create(
          <TodoList items={todos} toggleTodo={jest.fn()} deleteTodo={jest.fn()} />,
        )
        expect(tree).toMatchSnapshot()
      })

      it(`should render correctly with ${i} checked todos`, () => {
        const todos = createTodos(i, true)
        const tree = create(
          <TodoList items={todos} toggleTodo={jest.fn()} deleteTodo={jest.fn()} />,
        )
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('user clicking on delete icon', () => {
    ['id1', 'id2', 'id3'].map(id => {
      it(`should call deleteTodo with ${id} once`, () => {
        const todos = [createTodo(id, false)]
        const deleteTodo = jest.fn()
        const element = shallow(
          <TodoList items={todos} deleteTodo={deleteTodo} toggleTodo={jest.fn()} />,
        )

        const itemProps = element.find(TodoItem).props()
        if (itemProps.onDelete) {
          itemProps.onDelete()
        } else {
          fail('onDelete should not be undefined')
        }

        expect(deleteTodo).toHaveBeenCalledWith(id)
        expect(deleteTodo).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('user clicking on checkbox icon', () => {
    ['id1', 'id2', 'id3'].map(id => {
      it(`should call deleteTodo with ${id} and true once`, () => {
        const todos = [createTodo(id, false)]
        const toggleTodo = jest.fn()
        const element = shallow(
          <TodoList items={todos} toggleTodo={toggleTodo} deleteTodo={jest.fn()} />,
        )

        const itemProps = element.find(TodoItem).props()
        if (itemProps.onChange) {
          itemProps.onChange(true)
        } else {
          fail('onChange should not be undefineds')
        }

        expect(toggleTodo).toHaveBeenCalledWith(id, true)
        expect(toggleTodo).toHaveBeenCalledTimes(1)
      })
      it(`should call deleteTodo with ${id} and false once`, () => {
        const todos = [createTodo(id, true)]
        const toggleTodo = jest.fn()
        const element = shallow(
          <TodoList items={todos} toggleTodo={toggleTodo} deleteTodo={jest.fn()} />,
        )

        const itemProps = element.find(TodoItem).props()
        if (itemProps.onChange) {
          itemProps.onChange(false)
        } else {
          fail('onChange should not be undefined')
        }

        expect(toggleTodo).toHaveBeenCalledWith(id, false)
        expect(toggleTodo).toHaveBeenCalledTimes(1)
      })
    })
  })
})
