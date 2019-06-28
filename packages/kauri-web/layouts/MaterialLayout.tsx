import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import { connect } from "react-redux";
import Navbar from "../components/containers/Navbar";
import StyledFooter from "../components/containers/StyledFooter";
import Modal from "../../kauri-components/components/Modal";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IReduxState } from "../lib/Module";
import { footerHeight } from "../components/containers/StyledFooter/View";

const mapStateToProps = (state: IReduxState) => ({
  isModalOpen: state.modal.isModalOpen,
});

const useStyles = makeStyles((theme: Theme) => ({
  constrained : {
    maxWidth: 1280,
  },
  item: {
    width: "100%",
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: `calc(100vh - ${footerHeight}px)`,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 48,
    },
    paddingTop: 64,
  },
}));

interface IProps {
  isModalOpen: boolean;
  maxWidthConstrained?: boolean;
  children: any;
}

const Layout = ({ isModalOpen, children, maxWidthConstrained }: IProps) => {
  const classes = useStyles({});
  return (
    <Grid container={true}>
      <Head>
        <body className={isModalOpen ? "overflow-hidden" : null} />
      </Head>
      <Modal />
      <Grid item={true} className={classes.item}>
        <Navbar />
      </Grid>
      <Grid item={true} className={classes.item}>
        <div className={`${classes.root} ${maxWidthConstrained ? classes.constrained : ''}`}>{children}</div>
      </Grid>
      <StyledFooter />
    </Grid>
  );
};

export default connect(mapStateToProps)(Layout);
