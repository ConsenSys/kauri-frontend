import React from 'react'
import { definer } from 'highlightjs-solidity'
import hljs from 'highlight.js/lib/highlight'
import BareHighlight from 'react-fast-highlight/lib/BareHighlight'
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('solidity', definer)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)

export default ({ children }) => (
  <BareHighlight languages={['solidity', 'javascript', 'python']} highlightjs={hljs}>
    {children}
  </BareHighlight>
)

export { hljs }
