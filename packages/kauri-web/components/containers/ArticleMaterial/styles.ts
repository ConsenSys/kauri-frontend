import { Theme, makeStyles } from "@material-ui/core/styles";

export const ArticleStyles = makeStyles((theme: Theme) => {
  return {
    authorAvatar: {
      marginRight: theme.spacing(2),
    },
    buttons: {
      alignItems: "center",
      display: "flex",
    },
    card: {},
    centralColumn: {},
    content: {
      "& img": {
        borderRadius: 4,
        display: "block",
        margin: "auto",
        maxWidth: "100%",
      },
      background: theme.palette.common.white,
      padding: theme.spacing(3),
    },
    controls: {
      "& svg": {
        marginLeft: theme.spacing(2),
      },
      alignItems: "center",
      display: "flex",
      marginTop: theme.spacing(2),
    },
    floaterContainer: {
      display: "flex",
      justifyContent: "center",
    },
    floaterLeft: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: theme.spacing(5),
      position: "fixed",
    },
    floaterRight: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "flex-start",
      overflowY: "scroll",
      padding: theme.spacing(2, 2, 20, 2),
      position: "fixed",
    },
    header: {
      background: theme.palette.common.white,
      padding: theme.spacing(3),
    },
    recommended: {},
    root: {
      minHeight: "100%",
    },
  };
});
