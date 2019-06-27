import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ShowDown from "showdown";
import Typography from "@material-ui/core/Typography";
// import { withRouter } from "next/router";
import React from "react";
import ArticleOutline from "./ArticleOutline";
import Image from "../../../../kauri-components/components/Image";
import Chevron from "@material-ui/icons/ArrowBackIos";
import {
  Article,
  Article_author,
} from "../../../queries/Fragments/__generated__/Article";
// import Bookmark from "@material-ui/icons/Bookmark";
import Add from "@material-ui/icons/Add";
import Share from "@material-ui/icons/Share";
// import MoreVert from "@material-ui/icons/MoreVert";
import moment from "moment";
import Hidden from "@material-ui/core/Hidden";
import { ArticleStyles } from "./styles";

const converter = new ShowDown.Converter();

interface IProps {
  id: string;
  classes: any;
  data: {
    getArticle: Article;
  };
  RelatedArticles: any;
  router: any;
}

const AvatarComp = ({
  author: { username, name, avatar, id },
  datePublished,
  classes,
}: {
  author: Article_author;
  datePublished: string;
  classes: Record<string, string>;
}) => {
  return (
    <Grid container={true}>
      <Grid item={true} className={classes.authorAvatar}>
        {avatar ? (
          <Avatar
            alt={name ? name : username ? username : id ? id : "Anonymous"}
            src={avatar}
          />
        ) : (
          <Avatar>{!avatar && username && username.charAt(0)}</Avatar>
        )}
      </Grid>
      <Grid>
        <Typography variant="body2">
          {name ? name : username ? username : id ? id : "Anonymous"}
        </Typography>
        <Typography variant="body2">
          Last Updated {moment(datePublished).fromNow()}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ArticleComp = ({
  data: {
    getArticle: {
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
            <Chevron color="primary" className={classes.chevronUp} />
            <Typography variant="h6">
              {voteResult && voteResult.count}
            </Typography>
            <Typography variant="caption">Up Votes</Typography>
            <Chevron color="primary" className={classes.chevronDown} />
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
              <AvatarComp
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
