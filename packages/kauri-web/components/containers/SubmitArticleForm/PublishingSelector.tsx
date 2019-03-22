import AlertView from "../../../../kauri-components/components/Modal/AlertView";
import Select from "../../../../kauri-components/components/Select";
import styled from "../../../lib/styled-components";
import React, { useState } from "react";

export interface IOption {
  id?: string;
  name: string;
  type: string;
}

interface IProps {
  userId: string;
  communities: IOption[];
  handleSubmit: (
    submissionType: string,
    updateComment: undefined,
    destination: IOption
  ) => void;
  closeModalAction: () => void;
}

const TooltipContainer = styled.div`
  display: flex;
  width: 300px;
  padding: 0 20px;
  flex-direction: column;
  position: relative;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
  > * {
    cursor: pointer;
  }
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  padding: 20px;
  text-align: center;
  width: 100%;
  transition: all 0.3s;

  &:hover {
    color: #108e72;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #d8d8d8;
  }
`;

const Content = ({
  options,
  setDestination,
}: {
  options: IOption[];
  setDestination: (destValue: IOption) => void;
}) => {
  return (
    <TooltipContainer>
      {options &&
        options.map((i, key) => (
          <Label key={key} onClick={() => setDestination(i)}>
            Publish to {i.name}
          </Label>
        ))}
    </TooltipContainer>
  );
};

const PublishingSelector = (props: IProps) => {
  const options = [
    { id: props.userId, name: "My Articles", type: "USER" },
    ...props.communities,
  ];
  const [destination, setDestination] = useState(options[0]);
  return (
    <AlertView
      title="Publish Article"
      content={
        <div>
          <Select
            placeHolder="placeholder text"
            value={`Publish to ${destination.name}`}
          >
            <Content setDestination={setDestination} options={options} />
          </Select>
        </div>
      }
      closeModalAction={props.closeModalAction}
      confirmButtonAction={props.handleSubmit(
        "submit/update",
        undefined,
        destination
      )}
    />
  );
};

export default PublishingSelector;
