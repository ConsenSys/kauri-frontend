interface ILinkProps {
  href: string,
  as?: ?string,
  useAnchorTag?: boolean,
  children: any,
  fullWidth?: boolean,
}

export const Link: React.SFC<ILinkProps>