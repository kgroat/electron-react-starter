
import { Action } from 'redux'

export const type = 'RENAME_TODO'

interface Options {
  id: string
  name: string
}

export type RenameTodoAction = Options & Action

export default (options: Options): RenameTodoAction => ({
  ...options,
  type,
})
