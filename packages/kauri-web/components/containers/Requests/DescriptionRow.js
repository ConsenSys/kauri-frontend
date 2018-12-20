// @flow

import React from "react";
import redraft from "redraft";
import styled, { css } from "styled-components";
import YouTube from "react-youtube";
import Highlight from "../../../lib/hljs";
import { compose } from "recompose";
import withErrorCatch from "../../../lib/with-error-catch";
import TextTruncate from "react-text-truncate";
import { getHTMLFromMarkdown } from "../../../lib/markdown-converter-helper";
import stripHTML from "../../../lib/html-to-plain-text";

type Props = {
  record: { text: string },
  inReviewArticleComment?: boolean,
  fullText?: boolean,
  requestPage?: boolean,
  recentRequest?: boolean,
  openRequest?: boolean,
  type?: "article card",
  cardHeight?: number,
  imageURL?: string,
};

const styles = {
  code: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Roboto"',
    fontSize: 16,
    lineHeight: 23,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Roboto"',
    fontSize: 16,
    lineHeight: 23,
    padding: 20,
  },
};

export const inline = {
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
  CODE: (children, { key }) => (
    <span key={key} style={styles.code}>
      {children}
    </span>
  ),
};

const inlineStylesToPrune = {
  lineHeight: null,
};

const pruneInlineStyles = (child, type) => {
  return child.map((nodes, i) => {
    if (nodes && nodes.length > 0) {
      return nodes.map(node => {
        if (node.props && node.props.style) {
          return React.cloneElement(node, {
            style: {
              ...node.props.style,
              ...inlineStylesToPrune,
            },
          });
        }
        return node;
      });
    }
    return nodes;
  });
};

const truncateWithEllipsis = css`
  color: ${props => props.theme.primaryTextcolor};
  padding: 0 0;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -0.1px;
  line-height: 18px;
  text-align: left;
  text-overflow: ellipsis;
`;

const recentRequest = css`
  font-size: 13px;
`;

export const TruncateWithEllipsisCss = css`
  color: ${props => props.theme.primaryTextcolor};
  font-size: 14px;
  font-weight: normal;
  letter-spacing: -0.1px;
  line-height: 18px;
`;

const TruncateWithEllipsis = styled.div`
  ${TruncateWithEllipsisCss};
  ${props =>
    !props.fullText && props.type !== "article card" && truncateWithEllipsis};
  ${props => props.recentRequest && recentRequest};
`;

const addBreaklines = (
  children,
  keys,
  fullText,
  recentRequest,
  type = "article card"
) => {
  return children.map((child, i) => {
    return (
      <TruncateWithEllipsis
        index={i}
        type={type}
        recentRequest={recentRequest}
        fullText={fullText}
        key={keys && keys[i]}
      >
        {child[1].length === 0 && fullText ? (
          <br />
        ) : (
          pruneInlineStyles(child, type)
        )}
      </TruncateWithEllipsis>
    );
  });
};

class WithHover extends React.Component<*, { isHovered: boolean }> {
  state = {
    isHovered: false,
  };

  handleEnter = () => this.setState({ isHovered: true });
  handleLeave = () => this.setState({ isHovered: false });

  render() {
    return React.cloneElement(this.props.children, {
      ...this.state,
      ...this.props,
      handleEnter: this.handleEnter,
      handleLeave: this.handleLeave,
    });
  }
}

const Video = ({
  src,
  caption,
  display,
  handleEnter,
  handleLeave,
  isHovered,
}: *) => (
  <figure
    className={!isHovered ? "Video-wrap" : "Video-wrap hovered"}
    onMouseEnter={handleEnter}
    onMouseLeave={handleLeave}
  >
    {isHovered && caption && <span className="Video-caption">{caption}</span>}
    <video className="Video" src={src} controls />
  </figure>
);

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  max-height: 440px;
  > figure {
    max-width: 75%;
  }
`;

const figureHoverCss = css`
  :hover {
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.secondaryColor};
      opacity: 0.7;
      transition: background-color 0.5s ease;
    }
    > * {
      display: block;
    }
  }
`;

const Figure = styled.figure`
  display: inline-block;
  position: relative;
  margin: 20px;
  ${props => props.caption && figureHoverCss};
`;

const NestedImage = styled.img`
  max-height: 420px;
  text-align: center;
  max-width: 100%;
  float: left;
`;

const ImageCaption = styled.span`
  display: none;
  position: absolute;
  left: 0;
  top: calc(50% - 20px);
  text-align: center;
  height: 20px;
  width: 100%;
  color: #fff;
`;

const ImageRights = styled.span`
  position: absolute;
  bottom: 20px;
  color: #efefef;
  text-shadow: 1px 1px 1px #222;
  right: 20px;
`;

export const Image = ({
  src,
  caption,
  display,
  handleEnter,
  handleLeave,
  isHovered,
  rightsHolder,
}: *) => (
  <ImageContainer>
    <Figure
      caption={caption}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <ImageCaption>{caption}</ImageCaption>
      <NestedImage src={src} alt={caption} />
      {rightsHolder && <ImageRights>Image by: {rightsHolder}</ImageRights>}
    </Figure>
  </ImageContainer>
);

class YoutubeVideo extends React.Component<*> {
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0,
      },
    };

    return <YouTube videoId={this.props.videoID} opts={opts} />;
  }
}

export const typeMap = {
  image: Image,
  video: Video,
  youtube: YoutubeVideo,
  codeblock: props => <Highlight>{props.code}</Highlight>,
};

export const AtomicBlock = ({ type, ...props }) => {
  const Component = typeMap[type];
  if (Component) {
    return (
      <WithHover>
        <Component {...props} />
      </WithHover>
    );
  }
};

const getAtomic = (children, { data, keys }) =>
  data.map((item, i) => <AtomicBlock key={keys[i]} {...data[i]} />);

export const HeaderTwoCss = css`
  margin-top: 0px;
  margin-bottom: ${props => props.theme.space[3]}px;
  font-style: normal;
  color: ${props => props.theme.primaryTextcolor};
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
  margin: 20px 0px;
  * {
    font-size: 20px;
    font-weight: bold;
    margin: 21px 0px;
    color: ${props => props.theme.primaryTextcolor};
  }
`;

const HeaderOne = styled.h1`
  ${HeaderTwoCss};
  font-size: 20px;
`;

const HeaderTwo = styled.h2`
  ${HeaderTwoCss};
`;

const HeaderThree = styled.h3`
  ${HeaderTwoCss};
  font-size: 16px;
`;

const BlockQuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${props =>
    !props.fullText && props.type !== "article card" && truncateWithEllipsis};
`;

const FirstQuote = styled.span`
  color: black;
  font-size: 36px;
  font-weight: bold;
`;

const LastQuote = styled(FirstQuote)`
  align-self: flex-end;
`;

const BlockQuoteContent = styled.i`
  text-align: center;
  word-break: break-word;
  padding: 0 2em;
  font-size: 16px;
  color: ${props => props.theme.primaryTextcolor};
  ${props =>
    !props.fullText && props.type !== "article card" && truncateWithEllipsis};
  ${props => !props.fullText && hideAtomicBlock};
`;

const BlockQuote = ({ children, keys, fullText }) => (
  <BlockQuoteContainer fullText={fullText}>
    {!!fullText && <FirstQuote>"</FirstQuote>}
    <BlockQuoteContent fullText={fullText}>{children}</BlockQuoteContent>
    {!!fullText && <LastQuote>"</LastQuote>}
  </BlockQuoteContainer>
);

export const ListItemCss = css`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 16px;
  line-height: 21px;
  > * {
    font-size: 16px;
    line-height: 21px;
  }
`;

const ListItemSpan = styled.span`
  ${ListItemCss};
`;

const ListItemLi = styled.li`
  ${ListItemCss};
`;

const ListItem = ({ inReviewArticle, ...props }) =>
  inReviewArticle ? <ListItemSpan {...props} /> : <ListItemLi {...props} />;

/**
 * Note that children can be maped to render a list or do other cool stuff
 */
export const blocks = (
  fullText: ?boolean,
  recentRequest?: boolean,
  openRequest?: boolean,
  inReviewArticle?: boolean,
  type?: "article card"
) => ({
  // Rendering blocks like this along with cleanup results in a single p tag for each paragraph
  // adding an empty block closes current paragraph and starts a new one
  "unordered-list-item": (children, { keys }) => (
    <ul>
      {fullText
        ? children.map((child, i) => (
            <ListItem inReviewArticle={inReviewArticle} key={keys[i]}>
              {pruneInlineStyles(child)}
            </ListItem>
          ))
        : addBreaklines(children, keys, fullText, recentRequest, type)}
    </ul>
  ),
  "ordered-list-item": (children, { keys }) => (
    <ol>
      {fullText
        ? children.map((child, i) => (
            <ListItem inReviewArticle={inReviewArticle} key={keys[i]}>
              {pruneInlineStyles(child)}
            </ListItem>
          ))
        : addBreaklines(children, keys, fullText, recentRequest, type)}
    </ol>
  ),
  atomic: fullText && getAtomic,
  unstyled: (children, { keys }) =>
    addBreaklines(children, keys, fullText, recentRequest, type),
  blockquote: (children, { keys }) => (
    <BlockQuote fullText={fullText} key={keys[0]} children={children} />
  ),
  "header-one": (children, { keys }) =>
    fullText
      ? children.map((child, i) => <HeaderOne key={keys[i]}>{child}</HeaderOne>)
      : null,
  "header-two": (children, { keys }) =>
    fullText
      ? children.map((child, i) => (
          <div
            id={
              children && children.length > 0
                ? children[0].length > 1 && child[1][1]
                  ? child[1][1].props.children[1]
                    ? child[1][1].props.children[1].props.children[0]
                        .replace(/ /g, "")
                        .toLowerCase()
                    : child[1][1].props.children[0]
                        .replace(/ /g, "")
                        .toLowerCase()
                  : child[1][0] && child[1][0].replace(/ /g, "").toLowerCase()
                : null
            }
            key={keys[i]}
          >
            <HeaderTwo>{child}</HeaderTwo>
          </div>
        ))
      : null,
  "header-three": (children, { keys }) =>
    fullText
      ? children.map((child, i) => (
          <HeaderThree key={keys[i]}>{child}</HeaderThree>
        ))
      : null,
  "header-four": (children, { keys }) =>
    fullText
      ? children.map((child, i) => (
          <HeaderThree key={keys[i]}>{child}</HeaderThree>
        ))
      : null,
  "header-five": (children, { keys }) =>
    fullText
      ? children.map((child, i) => (
          <HeaderThree key={keys[i]}>{child}</HeaderThree>
        ))
      : null,
  "header-six": (children, { keys }) =>
    fullText
      ? children.map((child, i) => (
          <HeaderThree key={keys[i]}>{child}</HeaderThree>
        ))
      : null,
});

const ColouredLink = styled.a`
  color: ${props => props.theme.primaryColor};
`;

export const entities = {
  LINK: (children, entity, { key }) => (
    <ColouredLink key={key} href={entity.url}>
      {children}
    </ColouredLink>
  ),
  IMAGE: (children, data, { key }) => {
    // children.map((x, i) => console.log(data[i]))
    return children.map((item, i) => (
      <AtomicBlock key={key} {...data} type="image" />
    ));
  },
};

const hideAtomicBlock = css`
  figure,
  iframe {
    display: none;
  }
`;

const articleCardCss = css`
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  > :not(div) {
    display: none;
  }
  > div {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: -0.1px;
    line-height: 18px;
    :nth-child(1n + ${props => (props.cardHeight > 290 ? "4" : "3")}) {
      display: none;
    }
    :nth-child(${props => (props.cardHeight > 290 ? "3" : "2")}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const MaxThreeLines = styled.div`
  font-size: 17px;
  letter-spacing: -0.1px;
  line-height: 24px;
  ${props => !props.fullText && hideAtomicBlock};
  ${props => props.type === "article card" && articleCardCss};
`;

export const options = {
  cleanup: {
    after: ["atomic"],
    types: ["unstyled"],
    trim: false,
    split: true,
  },
};

export default compose(withErrorCatch())(
  ({
    record: { text },
    fullText,
    requestPage,
    recentRequest,
    openRequest,
    inReviewArticleComment,
    type,
    cardHeight,
    imageURL,
    tags,
  }): Props => (
    <MaxThreeLines
      cardHeight={cardHeight}
      type={type}
      requestPage={requestPage}
      fullText={fullText}
      key={text}
      openRequest={openRequest}
    >
      {/* {console.log(EditorState.createWithContent(convertFromRaw(JSON.parse(text))))} */}
      {/* {console.log(type)} */}
      {typeof text === "string" && text.charAt(0) === "{" ? (
        fullText && JSON.parse(text).markdown ? (
          <div
            className={`DescriptionRow-markdown ${fullText &&
              !inReviewArticleComment &&
              "DescriptionRow-markdown--fullText"}`}
            dangerouslySetInnerHTML={{
              __html: getHTMLFromMarkdown(JSON.parse(text).markdown),
            }}
          />
        ) : fullText ? (
          redraft(
            JSON.parse(text),
            {
              inline: Boolean(fullText) && inline,
              blocks: blocks(fullText, recentRequest, type),
              entities: Boolean(fullText) && entities,
            },
            options
          )
        ) : JSON.parse(text).markdown ? (
          <TextTruncate
            line={imageURL ? 2 : cardHeight > 290 ? 6 : 2}
            truncateText="…"
            text={stripHTML(
              getHTMLFromMarkdown(JSON.parse(text).markdown)
            ).substring(0, imageURL ? 200 : 500)}
          />
        ) : (
          ""
        )
      ) : inReviewArticleComment &&
        typeof text === "string" &&
        text.length > 5 ? (
        text
      ) : (
        <span>Something went wrong.</span>
      )}
    </MaxThreeLines>
  )
);
