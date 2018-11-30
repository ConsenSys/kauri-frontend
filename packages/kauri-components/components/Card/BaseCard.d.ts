import * as React from "react";

interface IProps {
  cardWidth: number;
  cardHeight: number;
  imageURL: string | null;
  handleMouseEnter?: any;
  handleMouseLeave?: any;
  hoverAction?: any;
  isChosenArticle?: boolean;
  toggledOn?: boolean;
}

const BaseCardComponent: React.SFC<IProps>;

export default BaseCardComponent;
