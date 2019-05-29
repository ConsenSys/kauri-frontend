import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { withStyles, createStyles } from "@material-ui/core/styles";

interface IProps {
  markdown: string;
}

const styles = () => createStyles({});

const Outline = ({ markdown }: IProps) => {
  const split = markdown.split("\n");
  const filtered = split.filter(i => i[0] === "#");
  return (
    <Container>
      {filtered.map((i, key) => (
        <Typography key={key} variant="button" component="h2">
          {i.replace("#", "").replace("#", "-")}
        </Typography>
      ))}
    </Container>
  );
};

export default withStyles(styles)(Outline);
