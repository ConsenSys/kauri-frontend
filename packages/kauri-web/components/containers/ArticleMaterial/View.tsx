import Grid from "@material-ui/core/Grid";
import ShowDown from "showdown";
import Typography from "@material-ui/core/Typography";
// import { withRouter } from "next/router";
import React from "react";
import ArticleOutline from "./components/ArticleOutline";
import Image from "../../../../kauri-components/components/Image";
import ArticleAvatar from "./components/ArticleAvatar";
import ArticleActions from "./components/ArticleActions";
import ArticleCardMaterial from "../../../../kauri-components/components/Card/ArticleCardMaterial";
import { relatedArticles } from "../../../queries/__generated__/relatedArticles";

import {
  Article,
  Article_author,
} from "../../../queries/Fragments/__generated__/Article";
import Hidden from "@material-ui/core/Hidden";
import { ArticleStyles } from "./styles";
import VoteWidget from "./components/VoteWidget";
import slugify from "slugify";

const converter = new ShowDown.Converter();

interface IProps {
  id: string;
  classes: any;
  data: {
    getArticle: Article;
  };
  RelatedArticles: relatedArticles;
  router: any;
  voteAction: any;
  routeChangeAction: (route: string) => void;
  userId: string;
  openModalAction: (children: any) => void;
  // closeModalAction: () => void;
  hostName: string;
}

const ArticleComp = ({
  openModalAction,
  // closeModalAction,
  hostName,
  voteAction,
  routeChangeAction,
  userId,
  RelatedArticles: { searchMoreLikeThis },
  data: {
    getArticle: {
      id,
      author,
      content,
      attributes,
      title,
      voteResult,
      datePublished,
      version,
    },
  },
}: IProps) => {
  const classes = ArticleStyles();
  return (
    <>
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
                isLoggedIn={!!userId}
                id={String(id)}
                voteAction={voteAction}
                voteResult={voteResult}
                loginFirstToVote={() =>
                  routeChangeAction(
                    `/login?r=/${slugify(String(title), {
                      lower: true,
                    })}/${id}/a`
                  )
                }
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
              <ArticleActions
                userId={userId}
                id={String(id)}
                version={Number(version)}
                openModalAction={openModalAction}
                routeChangeAction={routeChangeAction}
                title={String(title)}
                hostName={hostName}
              />
            </Grid>
          </div>
          {attributes.background && (
            <Image height={160} width="100%" image={attributes.background} />
          )}
          <div id="content" className={classes.content}>
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(
                  JSON.parse(String(content)).markdown
                ),
              }}
            />
          </div>
          <Grid spacing={3} justify="center" container={true}>
            {searchMoreLikeThis &&
              searchMoreLikeThis.content &&
              searchMoreLikeThis.content.map(
                (recommendedArticle, key: number) =>
                  recommendedArticle &&
                  recommendedArticle.resource &&
                  recommendedArticle.resource.__typename === "ArticleDTO" ? (
                    <Grid sm={6}>
                      <ArticleCardMaterial
                        className={classes.card}
                        key={key}
                        href={`/${slugify(
                          String(recommendedArticle.resource.title),
                          { lower: true }
                        )}/${recommendedArticle.resource.id}/a`}
                        {...recommendedArticle.resource}
                      />
                    </Grid>
                  ) : null
              )}
          </Grid>
        </Grid>
        <Hidden smDown={true}>
          <Grid item={true} xs={false} sm={2}>
            <div className={classes.floaterRight}>
              <ArticleOutline />
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

// export default withRouter(Article);
export default ArticleComp;
