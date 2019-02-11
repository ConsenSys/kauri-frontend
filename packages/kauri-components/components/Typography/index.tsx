import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import { StyledComponentClass } from "styled-components";

export const BodyCardCss = css<{ color: string | undefined }>`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -0.1px;
  margin-bottom: ${props => props.theme.space[0]}px;
  line-height: 18px;
  color: ${props =>
    typeof props.color === "string" && props.theme.colors[props.color]};
`;

interface ITypography {
  name?: string; // START NAME WITH A CAPITAL LETTER NOOB AND NO SPACES
  as?: keyof JSX.IntrinsicElements;
  fontSize?: 11 | 13 | 14 | 16 | 18 | 20 | 22 | 28;
  fontWeight?: 300 | "normal" | 500 | "bold";
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  color?: string;
  hoverColor?: string;
  lineHeight?: string;
  component?: StyledComponentClass<any, any, any>;
}

const typographySpecifications: ITypography[] = [
  {
    as: "h1",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: "24px"
  },
  {
    as: "h2",
    fontSize: 18,
    fontWeight: "bold",
  },
  {
    as: "h3",
    fontSize: 16,
    fontWeight: "bold",
  },
  {
    as: "h4",
    fontSize: 14,
    fontWeight: "bold",
  },
  {
    as: "h5",
    fontSize: 13,
    fontWeight: "bold",
  },
  {
    as: "h6",
    fontSize: 11,
    fontWeight: "bold",
  },
  {
    as: "h1",
    fontSize: 28,
    fontWeight: 500,
    name: "Title1",
  },
  {
    as: "h3",
    fontSize: 20,
    fontWeight: 500,
    name: "Title2",
  },
  //
  // Content
  //
  {
    as: "span",
    fontSize: 16,
    fontWeight: "bold",
    name: "PageDescription",
  },
  {
    as: "span",
    fontSize: 13,
    fontWeight: "bold",
    name: "NavigationText",
    textTransform: "uppercase",
  },
  {
    component:
      // Because Nelson
      styled<{ color: string; textAlign: string }, "span">("span")`
        font-size: 11px;
        font-weight: bold;
        text-transform: uppercase;
        color: ${props =>
          typeof props.color === "string" && props.theme.colors[props.color]};
        text-align: ${props =>
          typeof props.textAlign === "string" && props.textAlign};
      `,
    name: "Label",
  },
  {
    as: "span",
    color: "primary",
    fontSize: 11,
    fontWeight: "bold",
    hoverColor: "hoverTextColor",
    name: "CTA",
    textTransform: "uppercase",
  },
  {
    component:
      // Because Nelson
      styled.li`
        font-size: 14px;
        font-weight: bold;
        list-style: circle outside none;
        color: ${props => props.theme.colors.primary};
      `,
    name: "ListBulletPoint",
  },
  {
    component:
      // Because Nelson
      styled.li`
        font-size: 14px;
        font-weight: bold;
        :before {
          content: "— ";
          margin-left: -20px;
        }
        list-style: none;
      `,
    name: "ListDashPoint",
  },
  {
    component:
      // Because Nelson
      styled.span`
        font-size: 17px;
        font-weight: normal;
        letter-spacing: -0.1px;
        line-height: 24px;
      `,
    name: "BodyArticle",
  },
  {
    component:
      // Because Nelson
      styled<{ textAlign: string }, "span">("span")`
        ${BodyCardCss};
        ${props =>
          typeof props.textAlign === "string" &&
          `text-align: ${props.textAlign}`};
      `,
    name: "BodyCard",
  },
];

interface ITypographyProps {
  textTransform?: string;
  hoverColor?: string;
  textAlign?: string;
  color?: string;
  onClick?: any;
  className?: string;
}

let typography = {};

typographySpecifications.map(
  ({
    name,
    as,
    fontWeight,
    lineHeight,
    fontSize,
    textTransform,
    color = "textPrimary",
    hoverColor,
    component,
  }) => {
    const styledComponent =
      typeof as === "string"
        ? styled<ITypographyProps, typeof as>(as)`
            color: ${props => props.theme.colors[props.color || color]};
            margin: 0px;
            font-weight: ${fontWeight};
            ${lineHeight && `line-height: ${lineHeight}`};
            font-size: ${fontSize}px;
            text-transform: ${props =>
              props.textTransform ? props.textTransform : textTransform};
            text-align: ${props => props.textAlign};
            :hover {
              color: ${props =>
                typeof props.hoverColor === "string"
                  ? props.theme.colors[props.hoverColor]
                  : props.theme.colors[
                      typeof hoverColor === "string" ? hoverColor : ""
                    ]};
              cursor: ${props =>
                (typeof props.hoverColor === "string" || hoverColor) &&
                "pointer"};
            }
          `
        : component;

    if (typeof name !== "undefined" && typeof name === "string") {
      typography = {
        ...typography,
        [name]: styledComponent,
      };
    } else if (typeof as === "string") {
      typography = {
        ...typography,
        [as.toUpperCase()]: styledComponent,
      };
    }
  }
);

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
} = typography as { [key: string]: React.SFC<ITypographyProps> };

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
};
