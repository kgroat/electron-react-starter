
import * as React from 'react'

import { storiesOf } from '@storybook/react'

import TodoItem from './'

storiesOf('TodoItem', module)
  .add('basic example', () => <TodoItem />)
