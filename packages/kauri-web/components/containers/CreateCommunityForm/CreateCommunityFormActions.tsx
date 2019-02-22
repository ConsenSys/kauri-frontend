import * as React from "react";
import ActionsSection, {
  ActionsContainer,
  MiddleActionsStack,
  RightActionsRow,
} from "../../../../kauri-components/components/Section/ActionsSection";
import PrimaryButtonComponent from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButtonComponent from "../../../../kauri-components/components/Button/TertiaryButton";
import GreenArrow from "../../common/GreenArrow";
import UploadIcon from "../../../../kauri-components/components/Icon/UploadIcon";

interface IProps {
  goBack: () => void;
  setupImageUploader: () => void;
  createCommunity: () => void;
}

const Component: React.FunctionComponent<IProps> = props => (
  <ActionsContainer>
    <ActionsSection>
      <TertiaryButtonComponent
        icon={<GreenArrow direction={"left"} />}
        onClick={() => props.goBack()}
      >
        <span>Go Back</span>
      </TertiaryButtonComponent>

      <MiddleActionsStack>
        <TertiaryButtonComponent
          icon={<UploadIcon />}
          handleClick={() => props.setupImageUploader()}
        >
          Upload Background
        </TertiaryButtonComponent>
      </MiddleActionsStack>

      <RightActionsRow>
        <PrimaryButtonComponent onClick={() => props.createCommunity()}>
          Create
        </PrimaryButtonComponent>
      </RightActionsRow>
    </ActionsSection>
  </ActionsContainer>
);

export default Component;
