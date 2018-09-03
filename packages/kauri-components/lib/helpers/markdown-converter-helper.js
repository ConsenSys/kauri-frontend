import { ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import Showdown from 'showdown'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const serverDOMBuilder = html => {
  const jsdom = require('jsdom')
  const { JSDOM } = jsdom

  const { document: jsdomDocument, HTMLElement, HTMLAnchorElement, HTMLImageElement } = new JSDOM(
    `<!DOCTYPE html>`
  ).window
  // HTMLElement and HTMLAnchorElement needed on global for convertFromHTML to work
  global.HTMLElement = HTMLElement
  global.HTMLAnchorElement = HTMLAnchorElement
  global.HTMLImageElement = HTMLImageElement

  const doc = jsdomDocument.implementation.createHTMLDocument('foo')
  doc.documentElement.innerHTML = html
  const body = doc.getElementsByTagName('body')[0]
  return body
}

const contentStateFromHTML = html => {
  // if DOMBuilder is undefined convertFromHTML will use the browser dom,
  //  hence we set DOMBuilder to undefined when document exist
  let DOMBuilder = typeof document === 'undefined' ? serverDOMBuilder : undefined
  const blocksFromHTML = convertFromHTML(html, DOMBuilder)
  return ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
}

const getHTMLFromMarkdown = markdown => converter.makeHtml(markdown)

const getRawStateFromMarkdown = markdown => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })
  const html = converter.makeHtml(markdown)
  const contentState = contentStateFromHTML(html)
  return convertToRaw(contentState)
}

export { serverDOMBuilder, contentStateFromHTML, getHTMLFromMarkdown, getRawStateFromMarkdown }
