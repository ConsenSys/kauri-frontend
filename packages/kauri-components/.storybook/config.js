import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'	
import 'storybook-chromatic'
import themeConfig from '../lib/theme-config'	

 addDecorator(story => (	
  <ThemeProvider theme={themeConfig}>	
    { story() }	
  </ThemeProvider>	
))

function loadStories() {
  const req = require.context('../stories', true, /.bs.js$/)
  req.keys().forEach(filename => req(filename))
  const jsreq = require.context('../js-stories', true, /.stories.js$/)
  jsreq.keys().forEach(filename => jsreq(filename))
}

configure(loadStories, module)
