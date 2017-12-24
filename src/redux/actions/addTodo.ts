
import { Action } from 'redux'

export const type = 'ADD_TODO'

interface Options {
  name: string
  checked?: boolean
}

export type AddTodoAction = Options & Action

export default (options: Options): AddTodoAction => ({
  ...options,
  type,
})
