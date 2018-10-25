import CodeBlockButton from './Button'
import CodeBlock from './Block'

export default {
  // Friendly plugin name
  title: 'CodeBlock',
  // A unique plugin name used to identify the plugin and its blocks
  type: 'codeblock',
  // React component to be rendered in the block sidebar
  buttonComponent: CodeBlockButton,
  // React component for rendering the content block
  blockComponent: CodeBlock,
}
