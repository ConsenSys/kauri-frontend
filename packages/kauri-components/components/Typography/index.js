// @flow
import styled, { css } from 'styled-components'

import type { ReactComponentClass } from 'styled-components'

export const BodyCardCss = css`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -0.1px;
  line-height: 18px;
`

type Typography = {
  name?: string, // START NAME WITH A CAPITAL LETTER NOOB AND NO SPACES
  as?: string,
  fontSize?: 11 | 13 | 14 | 16 | 18 | 20 | 22 | 28,
  fontWeight?: 300 | 'normal' | 500 | 'bold',
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize',
  color?: string,
  hoverColor?: string,
  component?: ReactComponentClass<{}>,
}

const typographySpecifications: Array<Typography> = [
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
    textTransform: 'uppercase',
  },
  {
    name: 'Label',
    component:
      // Because Nelson
      styled.span`
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        color: ${props => props.theme.colors[props.color]};
      `,
  },
  {
    name: 'CTA',
    as: 'span',
    fontWeight: 'bold',
    fontSize: 11,
    textTransform: 'uppercase',
    color: 'primary',
    hoverColor: 'hoverTextColor',
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
        ${BodyCardCss};
        ${props => props.textAlign && `text-align: ${props.textAlign}`};
      `,
  },
]

let typography = {}

typographySpecifications.map(
  ({ name, as, fontWeight, fontSize, textTransform, color = 'textPrimary', hoverColor, component }) => {
    const styledComponent =
      typeof as === 'string'
        ? styled[as]`
            margin: 0px;
            font-weight: ${fontWeight};
            font-size: ${fontSize}px;
            text-transform: ${props => (props.textTransform ? props.textTransform : textTransform)};
            text-align: ${props => props.textAlign};
            :hover {
              color: ${props =>
    typeof props.hoverColor === 'string' && props.theme.colors[props.hoverColor || hoverColor]};
              cursor: ${props => typeof props.hoverColor === 'string' && 'pointer'};
            }
            color: ${props => props.theme.colors[props.color || color]};
          `
        : component

    if (typeof name !== 'undefined' && typeof name === 'string') {
      typography = {
        ...typography,
        [name]: styledComponent,
      }
    } else if (typeof as === 'string') {
      typography = {
        ...typography,
        [as.toUpperCase()]: styledComponent,
      }
    }
  }
)

const {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label,
  CTA,
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
  CTA,
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
