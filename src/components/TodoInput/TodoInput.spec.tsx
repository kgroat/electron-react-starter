
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import TodoInput from './'
import { title } from './TodoInput.scss'

describe('<TodoInput />', () => {
  describe('snapshots', () => {
    it('should render', () => {
      const tree = create(
        <TodoInput onAdd={jest.fn()} />,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('user submitting on todo', () => {
    it('should not call onAdd if no name has been chosen', () => {
      const onAdd = jest.fn()
      const element = shallow(
        <TodoInput onAdd={onAdd} />,
      )
      element.findWhere(el => el.is('form')).simulate('submit', { preventDefault: jest.fn() })
      expect(onAdd).not.toHaveBeenCalled()
    })
    it('should call onAdd with the name and false if a name has been chosen but the checkbox not checked', () => {
      const name = 'Get milk'
      const onAdd = jest.fn()
      const element = shallow(
        <TodoInput onAdd={onAdd} />,
      )
      element.findWhere(el => el.hasClass(title)).simulate('change', {
        currentTarget: {
          value: name,
        },
      })
      element.findWhere(el => el.is('form')).simulate('submit', { preventDefault: jest.fn() })
      expect(onAdd).toHaveBeenCalledWith(name, false)
      expect(onAdd).toHaveBeenCalledTimes(1)
    })
    it('should call onAdd with the name and true if a name has been chosen and the checkbox is checked', () => {
      const name = 'Get milk'
      const onAdd = jest.fn()
      const element = shallow(
        <TodoInput onAdd={onAdd} />,
      )
      element.findWhere(el => el.hasClass(title)).simulate('change', {
        currentTarget: {
          value: name,
        },
      })
      element.findWhere(el => el.hasClass('checkbox')).simulate('click')
      element.findWhere(el => el.is('form')).simulate('submit', { preventDefault: jest.fn() })
      expect(onAdd).toHaveBeenCalledWith(name, true)
      expect(onAdd).toHaveBeenCalledTimes(1)
    })
  })
})
