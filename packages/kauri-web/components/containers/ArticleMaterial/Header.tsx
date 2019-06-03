import Paper from "@material-ui/core/Paper";
import Image from "../../../../kauri-components/components/Image";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    // alignItems: "center",
    // color: "white",
    // display: "flex",
    height: 300,
    // justifyContent: "center",
    marginBottom: theme.spacing(4),
    // position: "relative",
  },
  image: {
    zIndex: 0,
  },
  title: {
    zIndex: 1,
  },
}));

interface IProps {
  attributes: any;
  title: any;
}

const Header = ({ attributes, title }: IProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} square={true}>
      <Image
        className={classes.image}
        asBackground={true}
        height="100%"
        width="100%"
        overlay={attributes.background && { opacity: 0.8 }}
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
    </Paper>
  );
};

export default Header;
