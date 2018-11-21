import * as React from "react";

type PageType = "RinkebyPublicProfile" | "Collection";

interface IHoverActionPayload {
  id: string;
  version: string;
}

interface IViewActionPayload {
  id: string;
  version: string;
}

interface IProps {
  id: string | null;
  version: number | null;
  content: string | null;
  date: string;
  title: string | null;
  username: string | null;
  userId: string | null;
  userAvatar: string | null;
  imageURL?: string;
  cardHeight?: number;
  cardWidth?: number;
  linkComponent?: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  pageType?: PageType;
  hoverAction?: (IHoverActionPayload) => void;
  viewAction?: (IViewActionPayload) => void;
  isChosenArticle?: boolean;
  resourceType: string | null;
  changeRoute?: (route: string) => void; 
}

declare const ArticleCard: React.SFC<IProps>;

export default ArticleCard;
