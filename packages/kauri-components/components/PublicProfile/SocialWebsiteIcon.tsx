import * as React from "react";
import styled from "styled-components";

const InvertSocialIcon = styled.img`
  filter: invert(100%);
`;

interface SocialWebsiteIconProps {
  brand: string;
  height: string;
  socialURL: string;
}

const SocialWebsiteIcon: React.SFC<SocialWebsiteIconProps> = ({
  height = 20,
  brand,
  socialURL
}) => (
  <a target="_blank" href={socialURL}>
    <InvertSocialIcon
      height={height}
      width={height}
      src={`https://unpkg.com/simple-icons@latest/icons/${brand}.svg`}
    />
  </a>
);
export default SocialWebsiteIcon;
