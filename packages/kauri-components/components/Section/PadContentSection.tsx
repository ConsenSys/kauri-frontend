import styled, { css } from "../../lib/styled-components";

const padChildrenContentCSS = css`
  > :first-child {
    ${props => props.theme.padContent};
  }
`;

const PadContentSection = styled<
  { background?: string; padChild?: boolean },
  "section"
>("section")`
  ${props => (props.padChild ? padChildrenContentCSS : props.theme.padContent)};
  background: ${props => props.theme.colors[props.background as string]};
`;

export default PadContentSection;
