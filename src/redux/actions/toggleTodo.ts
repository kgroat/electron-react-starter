
import { Action } from 'redux'

export const type = 'TOGGLE_TODO'

interface Options {
  id: string
  checked: boolean
}

export type ToggleTodoAction = Options & Action

export default (options: Options): ToggleTodoAction => ({
  ...options,
  type,
})
