import * as React from "react";
import styled from "../../lib/styled-components";
import theme from "../../lib/theme-config";
import { ISection } from "./SectionsContent";

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

export interface ICollection {
  id: string;
  name: string;
  sections: ISection[];
}

interface IProps {
  collections: ICollection[];
  handleClick: (payload: ICollection) => void;
}

const CollectionsContent: React.FunctionComponent<IProps> = props => {
  return (
    <TooltipContainer>
      {Array.isArray(props.collections) &&
        props.collections.map((collection, index) =>
          index !== props.collections.length - 1 ? (
            <React.Fragment>
              <Label onClick={() => props.handleClick(collection)}>
                {collection.name}
              </Label>
              <Divider />
            </React.Fragment>
          ) : (
            <Label onClick={() => props.handleClick(collection)}>
              {collection.name}
            </Label>
          )
        )}
    </TooltipContainer>
  );
};

export default CollectionsContent;
