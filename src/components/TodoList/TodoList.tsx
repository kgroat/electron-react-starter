
import * as React from 'react'

import { Todo } from 'state'
import TodoItem from 'components/TodoItem'

import { todoList } from './TodoList.scss'

export interface Props {
  items: Todo[]
  toggleTodo: (id: string, checked: boolean) => void
  deleteTodo: (id: string) => void
}

export default function TodoList ({ items, toggleTodo, deleteTodo }: Props) {
  return (
    <div className={todoList}>
      {
        items.map(item => (
          <TodoItem
            key={item.id}
            name={item.name}
            checked={item.checked}
            onChange={checked => toggleTodo(item.id, checked)}
            onDelete={() => deleteTodo(item.id)} />
        ))
      }
    </div>
  )
}
