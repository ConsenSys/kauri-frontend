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
import slugify from "slugify";
import { withRouter } from "next/router";
import React from "react";
import Outline from "./Outline";
import Image from "../../../../kauri-components/components/Image";

const Content = styled.div`
  & img {
    width: max-content;
    max-width: 100%;
    border-radius: 4px;
    margin: auto;
  }

  & p {
    display: flex;
    flex-direction: column;
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
    actionArea: {
      height: "100%",
    },
    card: {
      height: 310,
      margin: theme.spacing(2),
      maxWidth: 288,
    },
    container: {
      color: "white",
    },
    image: {
      marginBottom: theme.spacing(2),
    },
    item: {},
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
  <>
    <Grid container={true} justify="center">
      <Grid className={classes.item} item={true} xs={true}>
        Other Stuff
      </Grid>
      <Grid className={classes.item} item={true} xs={7}>
        <Content>
          <Image
            className={classes.image}
            height={160}
            width="100%"
            image={attributes.background}
          />
          <Typography
            className={classes.title}
            color="inherit"
            variant="h4"
            component="h1"
          >
            {title}
          </Typography>
          <div
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(JSON.parse(content).markdown),
            }}
          />
        </Content>
      </Grid>
      <Grid className={classes.item} item={true} xs={true}>
        <Outline markdown={JSON.parse(content).markdown} />
      </Grid>
    </Grid>
    <Grid
      direction="row"
      container={true}
      justify="center"
      alignItems="flex-start"
    >
      {searchMoreLikeThis &&
        searchMoreLikeThis.content &&
        searchMoreLikeThis.content.map((card: any) => (
          <Card
            onClick={() => {
              router.push(
                `/${slugify(card.resource.title, {
                  lower: true,
                })}/${card.resource.id}/a`
              );
            }}
            className={classes.card}
            key={card.resource.id}
          >
            <CardActionArea className={classes.actionArea}>
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
        ))}
    </Grid>
  </>
);

export default withStyles(styles)(withRouter(Article));
