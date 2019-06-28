import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Article_author } from "../../../../queries/Fragments/__generated__/Article";
import Typography from "@material-ui/core/Typography";

interface IProps {
  author: Article_author;
  datePublished: string;
  classes: Record<string, string>;
}

const AvatarComp = ({
  author: { username, name, avatar, id },
  datePublished,
  classes,
}: IProps) => {
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

export default AvatarComp;
