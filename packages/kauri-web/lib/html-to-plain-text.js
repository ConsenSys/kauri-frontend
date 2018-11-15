import R from 'ramda'
import cheerio from 'cheerio'
import { decode } from 'he'

// "private" helper for ensuring html entities are properly escaped
function _escapeHtml (input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// "private" helper for list processing into plaintext
function _list (str, isOrdered) {
  if (!str) return str

  const $ = cheerio.load(str)
  const listEl = isOrdered ? 'ol' : 'ul'

  $(listEl).each(function (i, el) {
    const $out = cheerio.load('<p></p>')
    const $el = $(el)

    $el.find('li').each(function (j, li) {
      const tick = isOrdered ? String(j + 1) + '.' : '-'

      $out('p').append(tick + ' ' + _escapeHtml($(li).text()) + '<br />')
    })

    // avoid excess spacing coming off last element
    // (we are wrapping with a <p> anyway)
    $out('br')
      .last()
      .remove()

    $el.replaceWith($out.html())
  })

  return $.html()
}

function stripStylesAndScripts (str) {
  const $ = cheerio.load(str)

  $('script').remove()
  $('style').remove()

  return $.html()
}

function stringify (x) {
  if (x === null || x === undefined) {
    return ''
  }

  return String(x)
}

function collapseWhitespace (val) {
  const output = val.replace(/\s+/g, ' ')
  return output
}

function linebreaks (str) {
  const output = str.replace(/<\s?(p|br)[^<]*>/gi, function (x, tag) {
    switch (tag.toLowerCase()) {
      case 'p':
        return '\n'
      case 'a':
        return ''
      case 'br':
        return '\n'
    }

    return x
  })

  return output
}

function removeCertainTags (str) {
  const output = str.replace(/<(img|h1|h2|h3|h4|h5|h6|ul|ol|li)[^<]*>(.*)/gi, function (x, tag) {
    return ''
  })

  return output
}

function listOrdered (str) {
  return _list(str, true)
}

function listUnordered (str) {
  return _list(str, false)
}

function stripCssConditionalComment (str) {
  return str.replace(/<!--\[if.*?<!\[endif\]-->/g, '')
}

function stripTags (str) {
  return str.replace(/<[^<]+>/g, '')
}

function trim (str) {
  return str.trim()
}

module.exports = R.pipe(
  stringify,
  stripStylesAndScripts,
  removeCertainTags,
  listOrdered,
  listUnordered,
  collapseWhitespace,
  linebreaks,
  stripCssConditionalComment,
  stripTags,
  decode,
  trim
)
