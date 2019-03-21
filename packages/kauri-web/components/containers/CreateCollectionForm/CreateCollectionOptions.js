// @flow
import * as React from "react";
import { Fragment } from "react";
import styled from "styled-components";
import theme from "../../../lib/theme-config";
import AddOptions from "../../../../kauri-components/components/AddOptions";

const TooltipContainer = styled.div`
  display: flex;
  width: 250px;
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
  color: ${theme.colors["primary"]};
`;

const Divider = styled.div`
  display: flex;
  height: 2px;
  width: 100%;
  background-color: ${theme.colors["divider"]};
  margin-top: ${theme.space[2]}px;
  margin-bottom: ${theme.space[2]}px;
  cursor: default;
`;
type Props = {
  currentSectionIndex: number,
  previousSectionHasArticles: boolean,
  addNewSection: () => void,
  removeSection: () => void,
  chooseArticle: () => void,
  chooseCollection: () => void,
};

const Content = (props: Props) => (
  <TooltipContainer>
    <Label onClick={props.chooseArticle}>Add Article To Section</Label>
    <Divider />
    <Label onClick={props.chooseCollection}>Add Collection To Section</Label>
    {props.previousSectionHasArticles && (
      <Fragment>
        <Divider />
        <Label onClick={props.addNewSection}>Add New Section</Label>
      </Fragment>
    )}
    {props.currentSectionIndex > 0 && (
      <Fragment>
        <Divider />
        <Label onClick={props.removeSection}>Remove Section</Label>
      </Fragment>
    )}
  </TooltipContainer>
);

export default (props: Props) => (
  <AddOptions>
    <Content {...props} />
  </AddOptions>
);
