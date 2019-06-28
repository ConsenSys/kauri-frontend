import Grid from "@material-ui/core/Grid";
import ShowDown from "showdown";
import Typography from "@material-ui/core/Typography";
// import { withRouter } from "next/router";
import React from "react";
import ArticleOutline from "./components/ArticleOutline";
import Image from "../../../../kauri-components/components/Image";
import ArticleAvatar from "./components/ArticleAvatar";

import {
  Article,
  Article_author,
} from "../../../queries/Fragments/__generated__/Article";
// import Bookmark from "@material-ui/icons/Bookmark";
import Add from "@material-ui/icons/Add";
import Share from "@material-ui/icons/Share";
// import MoreVert from "@material-ui/icons/MoreVert";
import Hidden from "@material-ui/core/Hidden";
import { ArticleStyles } from "./styles";
import VoteWidget from "./components/VoteWidget";

const converter = new ShowDown.Converter();

interface IProps {
  id: string;
  classes: any;
  data: {
    getArticle: Article;
  };
  RelatedArticles: any;
  router: any;
  voteAction: any;
}

const ArticleComp = ({
  voteAction,
  data: {
    getArticle: {
      id,
      author,
      content,
      attributes,
      title,
      voteResult,
      datePublished,
    },
  },
}: // RelatedArticles: { searchMoreLikeThis }
IProps) => {
  const classes = ArticleStyles();
  return (
    <Grid
      className={classes.root}
      container={true}
      justify="center"
      spacing={3}
    >
      <Hidden smDown={true}>
        <Grid item={true} sm={2} className={classes.floaterContainer}>
          <div className={classes.floaterLeft}>
            <VoteWidget
              id={String(id)}
              voteAction={voteAction}
              voteResult={voteResult}
            />
          </div>
        </Grid>
      </Hidden>
      <Grid className={classes.centralColumn} item={true} xs={12} md={8}>
        <div className={classes.header}>
          <Typography color="inherit" variant="h4" component="h1">
            {title}
          </Typography>
          <Grid
            className={classes.controls}
            container={true}
            justify="space-between"
          >
            <Grid item={true}>
              <ArticleAvatar
                author={author as Article_author}
                datePublished={datePublished}
                classes={classes}
              />
            </Grid>
            <Grid item={true} className={classes.buttons}>
              {/* <Bookmark color="primary" /> */}
              <Add color="primary" />
              <Share color="primary" />
              {/* <MoreVert color="primary" /> */}
            </Grid>
          </Grid>
        </div>
        {attributes.background && (
          <Image height={160} width="100%" image={attributes.background} />
        )}
        <div id="content" className={classes.content}>
          <div
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(JSON.parse(String(content)).markdown),
            }}
          />
        </div>
      </Grid>
      <Hidden smDown={true}>
        <Grid item={true} xs={false} sm={2}>
          <div className={classes.floaterRight}>
            <ArticleOutline />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

// export default withRouter(Article);
export default ArticleComp;
