import Grid from "@material-ui/core/Grid";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import ShowDown from "showdown";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TTruncate from "react-text-truncate";
import ButtonBase from "@material-ui/core/ButtonBase";
import slugify from "slugify";
import { withRouter } from "next/router";
import React from "react";
import Header from "./Header";
import Outline from "./Outline";

const Content = styled.div`
  & img {
    max-width: 100%;
    border-radius: 4px;
    margin: 8px 0px;
  }

  pre {
    color: white;
    background: black;
    border-radius: 4px;
    padding: 8px;
  }
`;

const converter = new ShowDown.Converter();

const styles = (theme: Theme) =>
  createStyles({
    card: {
      height: 310,
      margin: theme.spacing(2),
      maxWidth: 288,
    },
    container: {
      color: "white",
    },
    media: {
      height: 140,
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
  });

interface IProps {
  id: string;
  classes: any;
  data: any;
  RelatedArticles: any;
  router: any;
}

const Article = ({
  classes,
  data: {
    getArticle: { content, attributes, title },
  },
  RelatedArticles: { searchMoreLikeThis },
  router,
}: IProps) => (
  <div>
    <Header attributes={attributes} title={title} />
    <Grid container={true} justify="center" spacing={3}>
      <Grid item={true} xs={true}>
        <Outline markdown={JSON.parse(content).markdown} />
      </Grid>
      <Grid item={true} xs={6}>
        <Content
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(JSON.parse(content).markdown),
          }}
        />
      </Grid>
      <Grid item={true} xs={true}>
        Related
      </Grid>
    </Grid>
    <Grid
      direction="row"
      container={true}
      justify="center"
      alignItems="flex-start"
      spacing={0}
    >
      {searchMoreLikeThis &&
        searchMoreLikeThis.content &&
        searchMoreLikeThis.content.map((card: any) => (
          <ButtonBase
            className={classes.cardAction}
            onClick={() => {
              router.push(
                `/a/${slugify(card.resource.title, {
                  lower: true,
                })}/${card.resource.id}`
              );
            }}
          >
            <Card className={classes.card} key={card.resource.id}>
              <CardActionArea>
                {card.resource.attributes.background && (
                  <CardMedia
                    className={classes.media}
                    image={card.resource.attributes.background}
                    title={card.resource.title}
                  />
                )}
                <CardContent>
                  <Typography
                    align="left"
                    gutterBottom={true}
                    variant="h6"
                    component="h3"
                  >
                    <TTruncate
                      truncateText="…"
                      line={2}
                      text={card.resource.title}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="left"
                  >
                    <TTruncate
                      truncateText="…"
                      line={3}
                      text={card.resource.description}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ButtonBase>
        ))}
    </Grid>
  </div>
);

export default withStyles(styles)(withRouter(Article));
