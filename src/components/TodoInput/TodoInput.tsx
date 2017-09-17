
import * as React from 'react'

import { todoInput, title, titleDefault, icon, disabled } from './TodoInput.scss'

export interface State {
  name: string
  checked: boolean
}

export interface Props {
  onAdd: (name: string, checked: boolean) => void
}

export default class TodoInput extends React.Component<Props, State> {
  state = {
    name: '',
    checked: false
  }

  setName = (name: string) =>
    this.setState({ name })

  toggleChecked = (checked = !this.state.checked) => 
    this.setState({ checked })

  onPlusClicked = () => {
    if (!this.state.name) {
      return
    }
    this.props.onAdd(this.state.name, this.state.checked)
    this.setState({ name: '', checked: false })
  }

  onNameChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setName(ev.currentTarget.value)

  render() {
    const checkboxIcon = this.state.checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
  
    return (
      <div className={todoInput}>
        <input className={title} onChange={this.onNameChange} value={this.state.name} />
        { !this.state.name ? <span className={titleDefault}>Choose Name</span> : '' }
        <i onClick={() => this.toggleChecked()} className={`checkbox mdi mdi-${checkboxIcon} ${icon}`} />
        <i onClick={this.onPlusClicked} className={`mdi mdi-plus-box ${icon} ${!this.state.name ? disabled : ''}`} />
      </div>
    )
  }
}
