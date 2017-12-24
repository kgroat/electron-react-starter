
import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import TodoItem from './'
import { checkboxIcon, deleteIcon } from './TodoItem.scss'

describe('<TodoItem />', () => {
  describe('snapshots', () => {
    it('should render unchecked without a delete icon', () => {
      const tree = create(
        <TodoItem name='Get milk' />,
      )
      expect(tree).toMatchSnapshot()
    })
    it('should render checked without a delete icon', () => {
      const tree = create(
        <TodoItem name='Get milk' checked />,
      )
      expect(tree).toMatchSnapshot()
    })
    it('should render with a delete icon', () => {
      const tree = create(
        <TodoItem name='Get milk' onDelete={jest.fn()} />,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('user clicking on checkbox', () => {
    it('should call onChange with true once', () => {
      const onChange = jest.fn()
      const element = shallow(
        <TodoItem name='Get milk' onChange={onChange} />,
      )
      element.findWhere(el => el.hasClass(checkboxIcon)).simulate('click')
      expect(onChange).toHaveBeenCalledWith(true)
      expect(onChange).toHaveBeenCalledTimes(1)
    })
    it('should call onChange with false once', () => {
      const onChange = jest.fn()
      const element = shallow(
        <TodoItem name='Get milk' checked onChange={onChange} />,
      )
      element.findWhere(el => el.hasClass(checkboxIcon)).simulate('click')
      expect(onChange).toHaveBeenCalledWith(false)
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('user clicking on delete', () => {
    it('should call onDelete once', () => {
      const onDelete = jest.fn()
      const element = shallow(
        <TodoItem name='Get milk' onDelete={onDelete} />,
      )
      element.findWhere(el => el.hasClass(deleteIcon)).simulate('click')
      expect(onDelete).toHaveBeenCalledTimes(1)
    })
  })
})
