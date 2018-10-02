// @flow
import styled from 'styled-components'

import type { ReactComponentClass } from 'styled-components'

type TypographyType = {
  name?: string, // START NAME WITH A CAPITAL LETTER NOOB AND NO SPACES
  as?: string,
  fontSize?: 11 | 13 | 14 | 16 | 18 | 20 | 22 | 28,
  fontWeight?: 300 | 'normal' | 500 | 'bold',
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize',
  color?: string,
  hoverColor?: string,
  component?: ReactComponentClass<{}>
}

const typographyTypes: Array<TypographyType> = [
  {
    as: 'h1',
    fontWeight: 'bold',
    fontSize: 20,
  },
  {
    as: 'h2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  {
    as: 'h3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  {
    as: 'h4',
    fontWeight: 'bold',
    fontSize: 14,
  },
  {
    as: 'h5',
    fontWeight: 'bold',
    fontSize: 13,
  },
  {
    as: 'h6',
    fontWeight: 'bold',
    fontSize: 11,
  },
  {
    name: 'Title1',
    as: 'h1',
    fontWeight: 500,
    fontSize: 28,
  },
  {
    name: 'Title2',
    as: 'h3',
    fontWeight: 500,
    fontSize: 20,
  },
  //
  // Content
  //
  {
    name: 'PageDescription',
    as: 'span',
    fontWeight: 'bold',
    fontSize: 16,
  },
  {
    name: 'NavigationText',
    as: 'span',
    fontWeight: 'bold',
    fontSize: 13,
  },
  {
    name: 'Label',
    as: 'span',
    fontWeight: 'bold',
    fontSize: 11,
  },
  {
    name: 'ListBulletPoint',
    component:
    // Because Nelson
    styled.li`
        font-size: 14px;
        font-weight: bold;
        list-style: circle outside none;
      `,
  },
  {
    name: 'ListDashPoint',
    component:
    // Because Nelson
    styled.li`
        font-size: 14px;
        font-weight: bold;
        :before {
          content: '— ';
          margin-left: -20px;
        }
        list-style: none;
      `,
  },
  {
    name: 'BodyArticle',
    component:
      // Because Nelson
      styled.span`
        font-size: 17px;
        font-weight: normal;
        letter-spacing: -0.1px;
        line-height: 24px;
      `,
  },
  {
    name: 'BodyCard',
    component:
      // Because Nelson
      styled.span`
        font-size: 14px;
        font-weight: normal;
        letter-spacing: -0.1px;
        line-height: 18px;
      `,
  },

]

let typography = {}

typographyTypes.map(({ name, as, fontWeight, fontSize, textTransform, color, hoverColor, component }) => {
  const styledComponent = typeof as === 'string'
    ? styled[as]`
    margin: 0px;
    font-weight: ${fontWeight};
    font-size: ${fontSize}px;
    ${textTransform && `text-transform: ${textTransform}`};
    :hover {
      color: ${props => typeof hoverColor === 'string' && props.theme.colors[hoverColor]};
      cursor: ${props => typeof hoverColor === 'string' && 'pointer'};
    }
    color: ${props => typeof color === 'string' && props.theme.colors[color]};
  ` : component

  if (typeof name !== 'undefined' && typeof name === 'string') {
    typography = ({
      ...typography,
      [name]: styledComponent,
    })
  } else if (typeof as === 'string') {
    typography = ({
      ...typography,
      [as.toUpperCase()]: styledComponent,
    })
  }
})

const {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label,
  ListBulletPoint,
  ListDashPoint,
  NavigationText,
  PageDescription,
  StandardContent,
  Title1,
  Title2,
  BodyCard,
  BodyArticle,
} = typography

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label,
  ListBulletPoint,
  ListDashPoint,
  NavigationText,
  PageDescription,
  StandardContent,
  Title1,
  Title2,
  BodyCard,
  BodyArticle,
}
