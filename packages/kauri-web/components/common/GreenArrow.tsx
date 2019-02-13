import React from "react";
import styled from "styled-components";

const getDirection = ({ direction }: { direction: string | undefined }) => {
  switch (direction) {
    case "left":
      return "90deg";
    case "up":
      return "180deg";
    case "right":
      return "270deg";
    default:
      return "0deg";
  }
};

const GreenArrow = styled.img`
  transform: rotate(${getDirection});
  padding-left: 0px !important;
`;
export default ({ direction }: { direction?: string }) => (
  <GreenArrow
    direction={direction}
    src={`/static/images/icons/green-down-arrow.png`}
  />
);
