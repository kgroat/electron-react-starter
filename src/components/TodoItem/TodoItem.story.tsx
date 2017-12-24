
import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TodoItem from './'

const deleteAction = action('deleted')

const checkAction = action('checked')

class Checkable extends React.Component<{}, { checked: boolean }> {
  state = {
    checked: false,
  }

  toggleChecked = (checked = !this.state.checked) => {
    this.setState({ checked })
    checkAction(checked)
  }

  render () {
    return <TodoItem name='Get milk' checked={this.state.checked} onChange={this.toggleChecked} onDelete={deleteAction} />
  }
}

storiesOf('TodoItem', module)
  .add('unchecked', () => <TodoItem name='Get milk' onChange={checkAction} />)
  .add('checked', () => <TodoItem name='Get milk' checked onChange={checkAction} />)
  .add('withDelete', () => <TodoItem name='Get milk' onDelete={deleteAction} onChange={checkAction} />)
  .add('interactible', () => <Checkable />)
  .add('larger', () => <span style={{ fontSize: '2em' }}><TodoItem name='Get milk' onDelete={deleteAction} /></span>)
