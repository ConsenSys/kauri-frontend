import { configure } from '@storybook/react'
import 'storybook-chromatic'

function loadStories() {
  const req = require.context('../stories', true, /.bs.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
