
export interface Todo {
  id: string
  name: string
  checked: boolean
}

export interface Todos {
  [id: string]: Todo
}
