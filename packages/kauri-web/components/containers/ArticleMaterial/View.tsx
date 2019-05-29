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

const Content = styled.div`
  & img {
    width: 100%;
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
      maxHeight: 310,
      maxWidth: 288,
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
}

const Article = ({
  classes,
  data: {
    getArticle: { content },
  },
  RelatedArticles: { searchMoreLikeThis },
}: IProps) => (
  <div className={classes.root}>
    <Grid container={true} justify="center" spacing={3}>
      <Grid item={true} xs={true}>
        Outline
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
    <Grid direction="row" container={true} justify="center" spacing={3}>
      {searchMoreLikeThis &&
        searchMoreLikeThis.content &&
        searchMoreLikeThis.content.map((card: any) => (
          <Grid spacing={3} item={true} xs={3} key={card.resource.id}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={card.resource.attributes.background}
                  title={card.resource.title}
                />
                <CardContent>
                  <Typography gutterBottom={true} variant="h6" component="h3">
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
                  >
                    {card.resource.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Grid>
  </div>
);

export default withStyles(styles)(Article);
