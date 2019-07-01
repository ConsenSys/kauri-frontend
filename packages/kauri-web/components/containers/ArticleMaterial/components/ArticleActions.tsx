import Grid from "@material-ui/core/Grid";
import AddToCollectionConnection from "../../../connections/AddToCollection";
// import Bookmark from "@material-ui/icons/Bookmark";
import Add from "@material-ui/icons/Add";
import Share from "@material-ui/icons/Share";
// import MoreVert from "@material-ui/icons/MoreVert";
import slugify from "slugify";
import { makeStyles } from "@material-ui/core/styles";

export const ArticleActionStyles = makeStyles(() => ({
  buttons: {
    alignItems: "center",
    display: "flex",
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.2)",
    },
    transition: "all 0.3s",
  },
}));

interface IProps {
  userId: string;
  openModalAction: (children: any) => void;
  id: string;
  version: number;
  title: string;
  routeChangeAction: (route: string) => void;
}

export default ({
  userId,
  openModalAction,
  id,
  version,
  routeChangeAction,
  title,
}: IProps) => {
  const classes = ArticleActionStyles();
  return (
    <Grid item={true} className={classes.buttons}>
      {/* <Bookmark color="primary" /> */}
      <Add
        className={classes.hover}
        color="primary"
        onClick={() =>
          userId
            ? openModalAction({
                children: (
                  <AddToCollectionConnection
                    articleId={String(id)}
                    version={Number(version)}
                  />
                ),
              })
            : routeChangeAction(
                `/login?r=/${slugify(title, { lower: true })}/${id}/a`
              )
        }
      />
      <Share className={classes.hover} color="primary" />
      {/* <MoreVert color="primary" /> */}
    </Grid>
  );
};
