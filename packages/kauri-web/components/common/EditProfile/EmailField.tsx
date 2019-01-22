import React from "react";
import Input from "../../../../kauri-components/components/Input/Input";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import Tooltip from "../../../../kauri-components/components/Tooltip/Tooltip";
import styled from "styled-components";
import { Label } from "../../../../kauri-components/components/Typography";

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: ${props => props.theme.space[1]}px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -${props => props.theme.space[3]}px;

  > .tooltip-body {
    margin-top: 5px;
  }
`;

const TooltipItemContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.space[1]}px;
`;

const Resend = styled(Label)`
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
`;

interface IProps {
  handleChange: (type: string, value: string) => void;
  email: string;
  status: string;
  resendEmailVerification: () => void;
}

class EmailField extends React.Component<IProps, {}> {
  resendVerificationEmail() {
    this.props.resendEmailVerification();
  }

  render() {
    return (
      <Container>
        {this.props.email && this.props.status === "CREATED" && (
          <Tooltip header={<Icon src="/static/images/icons8-info.png" />}>
            <TooltipItemContainer>
              <Label>Email Verification</Label>
              <Resend onClick={() => this.resendVerificationEmail()}>
                Resend
              </Resend>
            </TooltipItemContainer>
          </Tooltip>
        )}
        {this.props.email && this.props.status === "EMAIL_VERIFIED" && (
          <Tooltip header={<Icon src="/static/images/icons8-info.png" />}>
            <TooltipItemContainer>
              <Label>Email Verified</Label>
            </TooltipItemContainer>
          </Tooltip>
        )}
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.props.handleChange("email", e.target.value)
          }
          fontWeight={400}
          fontSize={1}
          value={this.props.email}
          placeHolder="Add Email"
        />
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    {}
  )
)(EmailField);
