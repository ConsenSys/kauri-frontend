import * as React from "react";
import ActionsSection, {
  MiddleActionsStack,
  RightActionsRow,
} from "../../../../kauri-components/components/Section/ActionsSection";
import PrimaryButtonComponent from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButtonComponent from "../../../../kauri-components/components/Button/TertiaryButton";
import GreenArrow from "../../common/GreenArrow";
import UploadIcon from "../../../../kauri-components/components/Icon/UploadIcon";

interface IProps {
  id: string | undefined;
  goBack: () => void;
  setupImageUploader: () => void;
  isSubmitting: boolean;
  background: null | string;
}

const Component: React.FunctionComponent<IProps> = props => (
  <ActionsSection
    bg={(typeof props.background === "string" && "transparent") || "bgPrimary"}
  >
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
        Background Image
      </TertiaryButtonComponent>
    </MiddleActionsStack>

    <RightActionsRow>
      <PrimaryButtonComponent type="submit" disabled={props.isSubmitting}>
        {`${props.id ? "Update" : "Create"} Community`}
      </PrimaryButtonComponent>
    </RightActionsRow>
  </ActionsSection>
);

export default Component;
