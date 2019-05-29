import Container from "@material-ui/core/Container";
import Image from "../../../../kauri-components/components/Image";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    container: {
      color: "white",
      height: 290,
    },
  });

interface IProps {
  attributes: any;
  title: any;
}

const Header = ({ attributes, title }: IProps) => (
  <Container>
    <Image
      height="100%"
      width="100%"
      overlay={attributes.background && { opacity: 0.8 }}
      image={attributes.background}
    />
    <Typography color="inherit" variant="h4" component="h1">
      {title}
    </Typography>
  </Container>
);

export default withStyles(styles)(Header);
