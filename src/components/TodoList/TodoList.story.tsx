
import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Todo } from 'state'

import TodoList from './'

const deleteAction = action('deleted')

const checkAction = action('checked')

const items: Todo[] = [
  {
    id: '0',
    name: 'Get milk',
    checked: false,
  },
  {
    id: '1',
    name: 'Get cookies',
    checked: false,
  },
  {
    id: '2',
    name: 'Do laundry',
    checked: true,
  },
]

class Interactible extends React.Component<{}, { items: Todo[] }> {
  state = {
    items: [...items],
  }

  toggleChecked = (id: string, checked: boolean) => {
    this.setState(({ items }) => ({
      items: items.map(item => {
        return item.id !== id
          ? item
          : {
            ...item,
            checked,
          }
      }),
    }))
    checkAction(id, checked)
  }

  deleteItem = (id: string) => {
    deleteAction(id)
    this.setState(({ items }) => ({
      items: items.filter(item => item.id !== id),
    }))
  }

  render () {
    return (
      <TodoList
        items={this.state.items}
        toggleTodo={this.toggleChecked}
        deleteTodo={this.deleteItem} />
    )
  }
}

storiesOf('TodoList', module)
  .add('display', () => <TodoList items={items} toggleTodo={checkAction} deleteTodo={deleteAction} />)
  .add('interactible', () => <Interactible />)
