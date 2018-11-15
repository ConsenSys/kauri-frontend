import * as React from "react";
import styled from 'styled-components'

interface IPersonalWebsiteProps {
  website: string;
}

const PersonalWebsiteLink = styled.a`
  color: white;
  font-size: ${props => props.theme.fontSize[1]};
  font-weight: ${props => props.theme.fontWeight[0]};
  font-style: normal;
  text-decoration: none;
  word-wrap: break-word;
`;

const PersonalWebsite: React.SFC<IPersonalWebsiteProps> = ({ website }) => (
  <PersonalWebsiteLink href={"https://" + website}>
    {website}
  </PersonalWebsiteLink>
);

export default PersonalWebsite;
