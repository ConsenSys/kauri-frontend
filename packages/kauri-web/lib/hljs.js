import React from 'react'
import { definer } from 'highlightjs-solidity'
import hljs from 'highlight.js/lib/highlight'
import BareHighlight from 'react-fast-highlight/lib/BareHighlight'
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('solidity', definer)
hljs.registerLanguage('js', javascript)

export default ({ children }) => (
  <BareHighlight languages={['js']} highlightjs={hljs}>
    {children}
  </BareHighlight>
)

export { hljs }
