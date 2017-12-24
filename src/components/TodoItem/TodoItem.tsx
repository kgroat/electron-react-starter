
import * as React from 'react'

import { todoItem, title, checkboxIcon as checkboxIconClass, deleteIcon } from './TodoItem.scss'

export interface Props {
  name: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  onDelete?: () => void
}

const noop = () => null

export default ({ name, checked, onChange = noop, onDelete }: Props) => {
  const checkboxIcon = checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'

  return (
    <div className={todoItem}>
      <span className={title}>{name}</span>
      { onDelete ? <i onClick={() => onDelete()} className={`mdi mdi-delete ${deleteIcon}`} /> : null }
      <i onClick={() => onChange(!checked)} className={`mdi mdi-${checkboxIcon} ${checkboxIconClass}`} />
    </div>
  )
}
