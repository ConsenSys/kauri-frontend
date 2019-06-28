import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Link from 'next/link'
import { logout } from "./Module"
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    avatar: {
      height: 30,
      width: 30,
    },
    grow: {
      flexGrow: 1,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200,
      },
    },
    inputRoot: {
      color: "inherit",
    },
    logo: {
      height: 30,
      marginRight: theme.spacing(0),
      width: 30,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    navbar: {
      margin: "auto",
      maxWidth: 1280,
      width: "100%",
    },
    navlink: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
      cursor: 'pointer',
      marginLeft: theme.spacing(2),
      transition: 'color 0.3s'
    },
    padded: {
      padding: theme.spacing(0,2)
    },
    searchClass: {
      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      marginLeft: 0,
      marginRight: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIconClass: {
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      width: theme.spacing(7),
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  };
});

interface IProps {
  routeChangeAction: (route: string) => void; 
  user: {
    id: string;
    username: string;
    avatar: string;
  }
}

const PrimarySearchAppBar = ({ routeChangeAction, user }: IProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLLIElement | HTMLButtonElement | null
  >(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={classes.padded} onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={ user ? handleProfileMenuOpen : () => routeChangeAction('/login')}>
        <IconButton color="inherit">
          { !user ? <AccountCircle className={classes.avatar} /> : <Avatar className={classes.avatar} src={user.avatar} />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar elevation={1} position="fixed" color="inherit">
        <Toolbar className={classes.navbar}>
          <img className={classes.logo} src="/static/images/logo.svg" />
          <Link href="/">
            <Typography className={classes.navlink} variant="button">
              Home
            </Typography>
          </Link>
          <Link href="/articles">
            <Typography className={classes.navlink} variant="button">
              Articles
            </Typography>
          </Link>
          <Link href="/collections">
            <Typography className={classes.navlink} variant="button">
              Collections
            </Typography>
          </Link>
          <Link href="/commuLnities">
            <Typography className={classes.navlink} variant="button">
              Communities
            </Typography>
          </Link>
          <Link href="/help">
            <Typography className={classes.navlink} variant="button">
              Help
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.searchClass}>
            <div className={classes.searchIconClass}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  routeChangeAction(`/search-results?q=${e.currentTarget.value}`)
                }
              }}
              classes={{
                input: classes.inputInput,
                root: classes.inputRoot,
              }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={user ? handleProfileMenuOpen : () => routeChangeAction('/login')}
              color="inherit"
            >
               { !user ?
                <AccountCircle className={classes.avatar} /> :
                user.avatar ?
                  <Avatar className={classes.avatar} src={user.avatar} /> :
                  <Avatar className={classes.avatar}>{user.username ? user.username.charAt(0) : user.id.charAt(0).toUpperCase()}</Avatar>}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
};

export default PrimarySearchAppBar;
