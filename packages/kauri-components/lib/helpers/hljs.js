import React from 'react'
import { definer } from 'highlightjs-solidity'
import hljs from 'highlight.js/lib/highlight'
import BareHighlight from 'react-fast-highlight/lib/BareHighlight'
hljs.registerLanguage('solidity', definer)

export default ({ children }) => (
  <BareHighlight languages={['solidity']} highlightjs={hljs}>
    {children}
  </BareHighlight>
)
