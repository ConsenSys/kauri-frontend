import * as React from "react";

interface PersonalWebsiteProps {
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

const PersonalWebsite: React.SFC<PersonalWebsiteProps> = ({ website }) => (
  <PersonalWebsiteLink href={"https://" + website}>
    {website}
  </PersonalWebsiteLink>
);

export default PersonalWebsite;
