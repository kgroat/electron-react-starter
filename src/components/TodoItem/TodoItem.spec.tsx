
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import TodoItem from './'

describe('<TodoItem />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <TodoItem />
    )
    expect(tree).toMatchSnapshot()
  })
})
