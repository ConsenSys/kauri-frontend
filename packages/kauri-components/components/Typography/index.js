// @flow
import styled from 'styled-components'

type TypographyType = {
  name?: string, // START NAME WITH A CAPITAL LETTER NOOB
  as: string,
  fontSize: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  fontWeight: 400 | 500 | 700,
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize',
  color?: string,
  hoverColor?: string,
}

const typographyTypes: Array<TypographyType> = [
  {
    as: 'h1',
    fontWeight: 400,
    fontSize: 7,
  },
  {
    as: 'h2',
    fontWeight: 400,
    fontSize: 6,
  },
  {
    as: 'h3',
    fontWeight: 400,
    fontSize: 5,
  },
  {
    as: 'h4',
    fontWeight: 400,
    fontSize: 4,
  },
  {
    as: 'h5',
    fontWeight: 400,
    fontSize: 3,
  },
  {
    as: 'h6',
    fontWeight: 400,
    fontSize: 2,
  },
  //
  // Misc
  //
  {
    name: 'Caption',
    as: 'span',
    fontWeight: 500,
    fontSize: 0,
    textTransform: 'uppercase',
  },
  {
    name: 'Label',
    as: 'span',
    fontWeight: 700,
    fontSize: 0,
  },
  {
    name: 'Username',
    as: 'h6',
    fontWeight: 700,
    fontSize: 2,
  },
  {
    name: 'Date',
    as: 'span',
    fontWeight: 500,
    fontSize: 0,
    textTransform: 'uppercase',
  },
  {
    name: 'CTA',
    as: 'a',
    fontWeight: 700,
    fontSize: 1,
    textTransform: 'uppercase',
    color: 'primary',
    hoverColor: 'hoverTextColor',
  },
  //
  // Content
  //
  {
    name: 'StandardContent',
    as: 'span',
    fontSize: 2,
    fontWeight: 500,
  },

]

let typography = {}

typographyTypes.map(({ name, as, fontWeight, fontSize, textTransform, color, hoverColor }) => {
  typography = ({
    ...typography,
    [(typeof name !== 'undefined' && typeof name === 'string' && name) || as.toUpperCase()]:
      styled[as]`
        margin: 0px;
        font-weight: ${fontWeight};
        font-size: ${props => props.theme.fontSizes[fontSize]}px;
        ${textTransform && `text-transform: ${textTransform}`};
        :hover {
          color: ${props => hoverColor && props.theme.colors[hoverColor]};
          cursor: ${props => hoverColor && 'pointer'};
        }
        color: ${props => color && props.theme.colors[color]};
      `,
  })
})

module.exports = typography
