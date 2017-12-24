
import { Action } from 'redux'

export const type = 'DELETE_TODO'

interface Options {
  id: string
}

export type DeleteTodoAction = Options & Action

export default (options: Options): DeleteTodoAction => ({
  ...options,
  type,
})
