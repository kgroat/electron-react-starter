
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Todos } from 'state'
import { addTodo, toggleTodo, deleteTodo } from 'actions'

import TodoInput from 'components/TodoInput'
import TodoList from 'components/TodoList'

import { todoArea, helperBar, title, hideDone as hideDoneClass, icon } from './TodoArea.scss'

interface StateProps {
  todos: Todos
}

interface DispatchProps {
  addTodo: (name: string, checked: boolean) => void
  toggleTodo: (id: string, checked: boolean) => void
  deleteTodo: (id: string) => void
}

export type Props = StateProps & DispatchProps

interface LocalState {
  hideDone: boolean
}

export class TodoAreaBase extends React.Component<Props, LocalState> {
  state = {
    hideDone: true,
  }

  toggleHideDone = (hideDone = !this.state.hideDone) =>
    this.setState({ hideDone })

  render () {
    const { hideDone } = this.state

    const todos = hideDone
      ? Object.values(this.props.todos).filter(item => !item.checked)
      : Object.values(this.props.todos)

    const checkboxIcon = hideDone ? 'checkbox-marked-outline' : 'checkbox-blank-outline'

    return (
      <div className={todoArea}>
        <TodoInput onAdd={this.props.addTodo} />
        <div className={helperBar}>
          <span className={title}>
            Title
          </span>
          <span className={hideDoneClass}>
            Hide done?
            <i className={`mdi mdi-${checkboxIcon} ${icon}`} onClick={() => this.toggleHideDone()} />
          </span>
        </div>
        <TodoList items={todos} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
      </div>
    )
  }
}

function mapStateToProps ({ todos }: State): StateProps {
  return {
    todos,
  }
}

function mapDispatchToProps (dispatch: Dispatch<State>): DispatchProps {
  return {
    addTodo: (name, checked) => dispatch(addTodo({ name, checked })),
    toggleTodo: (id, checked) => dispatch(toggleTodo({ id, checked })),
    deleteTodo: (id) => dispatch(deleteTodo({ id })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAreaBase)
