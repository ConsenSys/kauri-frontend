interface ILinkProps {
  href: string;
  as?: string;
  useAnchorTag: boolean;
  children: any;
  fullWidth?: boolean;
  toSlug?: string;
}

export const Link: React.SFC<ILinkProps>;
