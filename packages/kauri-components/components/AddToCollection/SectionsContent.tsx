import * as React from "react";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";

const TooltipContainer = styled.div`
  display: flex;
  width: 300px;
  padding: ${theme.space[2]}px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
  > * {
    cursor: pointer;
  }
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  :hover {
    color: ${theme.colors.hoverTextColor};
  }
`;

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors.divider};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`;

interface IResource {
  id: string;
}

export interface ISection {
  id: string;
  name: string;
  resources: IResource[];
}

interface IProps {
  sections: ISection[];
  handleClick: (payload: ISection) => void;
}

const SectionsContent: React.FunctionComponent<IProps> = props => {
  return (
    <TooltipContainer>
      {Array.isArray(props.sections) &&
        props.sections.map((section, index) =>
          index !== props.sections.length - 1 ? (
            <React.Fragment>
              <Label onClick={() => props.handleClick(section)}>
                {section.name}
              </Label>
              <Divider />
            </React.Fragment>
          ) : (
            <Label onClick={() => props.handleClick(section)}>
              {section.name}
            </Label>
          )
        )}
    </TooltipContainer>
  );
};

export default SectionsContent;
