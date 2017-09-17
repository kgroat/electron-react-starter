
import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TodoInput from './'

storiesOf('TodoInput', module)
  .add('interactible', () => <TodoInput onAdd={action('added')} />)
