import React from "react";
import Input from "../../../../kauri-components/components/Input/Input";
import { compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import styled from "../../../lib/styled-components";
import theme from "../../../lib/theme-config";
import { Label } from "../../../../kauri-components/components/Typography";
import { Tooltip } from "react-tippy";

const Icon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: ${props => props.theme.space[1]}px;
`;

const Container = styled<{ oldEmail: string }, "div">("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  ${props => props.oldEmail && `margin-left: -${props.theme.space[3]}px;`}
  > .tooltip-body {
    margin-top: 5px;
  }
`;

const TooltipContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  padding: ${theme.space[2]}px;
  width: 100px;
  text-align: center;
  > * {
    cursor: pointer;
  }
  > span:last-child {
    text-transform: uppercase;
    font-size: ${theme.fontSizes[0]}px;
    font-weight: ${theme.fontWeight[3]};
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 4px;
  margin-bottom: -10px;
  margin-left: -7px;

  & > .resend {
    color: ${theme.colors.primary};
  }
`;

const TooltipArrow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  position: absolute;
  z-index: -1;
  bottom: -3%;
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
`;

interface IProps {
  handleChange: (type: string, value: string) => void;
  email: string;
  oldEmail: string;
  status: string;
  resendEmailVerification: () => void;
}

class EmailField extends React.Component<IProps, {}> {
  resendVerificationEmail() {
    this.props.resendEmailVerification();
  }

  render() {
    return (
      <Container oldEmail={this.props.oldEmail}>
        {this.props.oldEmail && this.props.status === "CREATED" && (
          <Tooltip
            html={
              <TooltipContainer>
                <TooltipArrow />
                <Label>Email Verification</Label>
                <Label
                  className="resend"
                  onClick={() => this.resendVerificationEmail()}
                >
                  Resend
                </Label>
              </TooltipContainer>
            }
            position="top"
            trigger="mouseenter"
            unmountHTMLWhenHide={true}
            interactive={true}
          >
            <Icon src="/static/images/icons8-info.png" />
          </Tooltip>
        )}
        {this.props.oldEmail && this.props.status === "EMAIL_VERIFIED" && (
          <Tooltip
            html={
              <TooltipContainer>
                <TooltipArrow />
                <Label>Email Verified</Label>
              </TooltipContainer>
            }
            position="top"
            trigger="mouseenter"
            unmountHTMLWhenHide={true}
          >
            <Icon src="/static/images/icons8-info.png" />
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
