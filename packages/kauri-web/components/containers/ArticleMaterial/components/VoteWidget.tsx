import Chevron from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

export const VoteWidgetStyles = makeStyles((theme: Theme) => ({
  chevronDown: {
    marginBottom: 5,
    marginTop: -5,
    transform: "rotate(-90deg)",
  },
  chevronUp: {
    marginBottom: -5,
    marginTop: 5,
    transform: "rotate(90deg)",
  },
  container: {
    "&.active": {
      cursor: "pointer",
    },
    "&:hover": {
      "&.active": {
        boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
      },
    },
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    position: "relative",
    transition: "0.3s",
  },
}));

interface IProps {
  voteAction: any;
  voteResult: any;
  id: string;
  loginFirstToVote: () => void;
  isLoggedIn: boolean;
}

const VoteWidget = ({
  id,
  voteResult,
  voteAction,
  loginFirstToVote,
  isLoggedIn,
}: IProps) => {
  const classes = VoteWidgetStyles();
  return (
    <>
      {console.log(voteResult)}
      <div
        className={`${classes.container} ${
          voteResult.hasVoted ? "" : "active"
        }`}
      >
        <Chevron
          onClick={() =>
            !voteResult.hasVoted
              ? isLoggedIn
                ? voteAction({
                    resourceId: {
                      id,
                      type: "ARTICLE",
                    },
                    value: 1,
                  })
                : loginFirstToVote()
              : null
          }
          color={voteResult.hasVoted ? "disabled" : "primary"}
          className={classes.chevronUp}
        />
      </div>
      <Typography variant="h6">{voteResult && voteResult.count}</Typography>
      <Typography variant="caption">Up Votes</Typography>
      <div
        className={`${classes.container} ${
          voteResult.hasVoted ? "" : "active"
        }`}
      >
        <Chevron
          onClick={() =>
            !voteResult.hasVoted
              ? isLoggedIn
                ? voteAction({
                    resourceId: {
                      id,
                      type: "ARTICLE",
                    },
                    value: -1,
                  })
                : loginFirstToVote()
              : null
          }
          color={voteResult.hasVoted ? "disabled" : "primary"}
          className={classes.chevronDown}
        />
      </div>
      {voteResult.hasVoted && (
        <Typography variant="caption">You have already voted</Typography>
      )}
    </>
  );
};

export default VoteWidget;
