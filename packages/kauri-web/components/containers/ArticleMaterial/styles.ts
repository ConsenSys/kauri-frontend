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
    centralColumn: {
      minHeight: "100%",
    },
    chevronDown: {
      transform: "rotate(-90deg)",
    },
    chevronUp: {
      transform: "rotate(90deg)",
    },
    content: {
      "& img": {
        borderRadius: 4,
        display: "block",
        margin: "auto",
        maxWidth: "100%",
      },
      background: theme.palette.common.white,
      minHeight: "100%",
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
      paddingBottom: theme.spacing(20),
      paddingTop: theme.spacing(2),
      position: "fixed",
    },
    header: {
      background: theme.palette.common.white,
      padding: theme.spacing(3),
    },
    root: {
      minHeight: "100%",
    },
  };
});

export const OutlineStyles = makeStyles((theme: Theme) => ({
  H2: {
    cursor: "pointer",
    marginLeft: 0,
    transition: "all 0.3s",
  },
  H3: {
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    transition: "all 0.3s",
  },
  active: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
  },
}));
