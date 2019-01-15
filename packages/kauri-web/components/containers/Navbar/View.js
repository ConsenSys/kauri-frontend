import React from "react";
import { Menu, Icon } from "antd";
import styled, { css } from "styled-components";
import { Link } from "../../../routes";
import Web3Status from "../Web3Status";
// import ArticleSearchbar from "../ArticleSearchbar";
import NavSearch from "../QuickSearch";
import { H6 } from "../../../../kauri-components/components/Typography";
import Tooltip from "../../../../kauri-components/components/Tooltip/Tooltip";
import { withRouter } from "next/router";

// const supportedNetworkIds = [4, 224895]
// const ONE_SECOND = 1000
// const TWENTY_SECONDS = ONE_SECOND * 20

export const menuHeaderHeight = 76;

const StyledMenu = styled(Menu)`
  display: flex;
  height: ${menuHeaderHeight}px !important;
  line-height: ${menuHeaderHeight}px !important;
  background-color: ${props =>
    props.navcolor
      ? props.navcolor
      : props.confirmationPage && props.theme.secondaryColor};
  border-bottom-color: ${props => props.navcolor} !important;
  @media (max-width: 500px) {
    padding: 0px 10px;
  }
`;

const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  color: #fff !important;
  padding: 0 15px;

  @media (max-width: 500px) {
    display: ${props => (props.onlyDesktop ? "none !important" : "flex")};
  }

  > a {
    color: #fff !important;
    :hover {
      ${props => props.theme.primaryColor} !important;
    }
  }
`;

const LogoImage = styled.img`
  height: 30px;
  width: 30px;
  z-index: 10;
`;

const LogoWrapper = styled.div`
  display: flex;
  margin-right: 24px;
  align-items: center;
  cursor: pointer;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Text = styled.a`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  height: 60px;
  border-bottom: ${props =>
    props.pathname === props.link ? "3px solid #0BA986" : "none"};
  color: #fff;
  :hover {
    color: ${props => props.theme.primaryColor} !important;
  }
`;

const ProfileMiniature = styled.div`
  background: white;
  color: #1e2428;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  margin-top: 23px;

  .anticon {
    margin: 0;
  }
`;

const TooltipItem = styled.div`
  color: #0ba986;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  width: 190px;
  line-height: 15px;
  text-align: center;
  margin: 10px;

  &: hover {
    color: #267765;
    text-decoration: underline;
  }
`;

const TooltipItemContainer = styled.div`
  padding: 10px;
`;

const Chevron = styled.span`
  font-size: 22px;
  line-height: 70px;
  display: inline-block;
  transform: rotate(90deg);
  margin-left: 10px;
`;

const TooltipDivider = styled.div`
  width: 100%;
  border: 1px solid #f2f2f2;
`;

const Avatar = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  align-self: center;
  justify-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${props =>
    props.variant === "white"
      ? props.theme.colors["white"]
      : props.theme.colors["textPrimary"]};
  > * {
    color: ${props =>
      props.variant === "white"
        ? props.theme.colors["textPrimary"]
        : props.theme.colors[props.color]};
    text-transform: uppercase;
    line-height: 10px;
  }
`;

const ProfileImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: url(${props => props.avatar}) center center;
  background-size: cover;
`;

const deleteAllCookies = callback => {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    eraseCookieFromAllPaths(name);
  }
  callback && setTimeout(() => callback(), 700);
};

const CreateResourceTooltipReference = styled.div`
  display: flex;
`;

const logout = () => {
  deleteAllCookies(() => {
    window.location.href = "/";
  });
};

const eraseCookieFromAllPaths = name => {
  // This function will attempt to remove a cookie from all paths.

  // do a simple pathless delete first.
  document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
  document.cookie =
    name +
    `=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.${
      window.location.hostname
    }`;
};

class Logo extends React.Component {
  render() {
    return (
      <LogoWrapper>
        <LogoImage
          onClick={() => this.props.routeChangeAction("/")}
          src="/static/images/logo.svg"
        />
      </LogoWrapper>
    );
  }
}

class Navbar extends React.Component {
  render() {
    const {
      userId,
      router,
      routeChangeAction,
      user,
      confirmationPage,
      navcolor,
    } = this.props;
    return (
      <StyledMenu
        confirmationPage={confirmationPage}
        selectedKeys={[router.pathname]}
        theme="dark"
        mode="horizontal"
        navcolor={navcolor}
      >
        <Logo routeChangeAction={routeChangeAction} alt="logo" />
        <StyledMenuItem key="/">
          <Link href="/">
            <Text href="/" pathname={router.pathname} link="/">
              HOME
            </Text>
          </Link>
        </StyledMenuItem>

        {user && user.topics && user.topics.length > 0 && (
          <StyledMenuItem onlyDesktop key="/approvals">
            <Link href={"/approvals"}>
              <Text
                href="/approvals"
                pathname={router.pathname}
                link="/approvals"
              >
                Approvals
              </Text>
            </Link>
          </StyledMenuItem>
        )}

        <StyledMenuItem>
          <Tooltip
            header={
              <Text link="/dropdown-selector-null">
                <CreateResourceTooltipReference>
                  Discover
                  <Chevron>›</Chevron>
                </CreateResourceTooltipReference>
              </Text>
            }
          >
            <TooltipItemContainer>
              <Link route="/articles">
                <TooltipItem
                  href="/articles"
                  pathname={router.pathname}
                  link="/articles"
                >
                  Articles
                </TooltipItem>
              </Link>
              <TooltipDivider />
              {/* <Link route="/communities">
                <TooltipItem
                  href="/communities"
                  pathname={router.pathname}
                  link="/communities"
                >
                  Communities
                </TooltipItem>
              </Link>
              <TooltipDivider /> */}
              <Link route="/collections">
                <TooltipItem
                  href="/collections"
                  pathname={router.pathname}
                  link="/collections"
                >
                  Collections
                </TooltipItem>
              </Link>
            </TooltipItemContainer>
          </Tooltip>
        </StyledMenuItem>
        <Spacer />
        <StyledMenuItem onlyDesktop>
          {/* <ArticleSearchbar collapsible /> */}
          <NavSearch />
        </StyledMenuItem>

        <StyledMenuItem onlyDesktop>
          <Tooltip
            header={
              <Text link="/dropdown-selector-null">
                <CreateResourceTooltipReference>
                  Create
                  <Chevron>›</Chevron>
                </CreateResourceTooltipReference>
              </Text>
            }
          >
            <TooltipItemContainer>
              <Link
                route={userId ? "/write-article" : "/login?r=/write-article"}
              >
                <TooltipItem
                  href="/write-article"
                  pathname={router.pathname}
                  link="/write-article"
                >
                  Write Article
                </TooltipItem>
              </Link>
              <TooltipDivider />
              <Link
                route={
                  userId ? "/create-collection" : `/login?r=/create-collection`
                }
              >
                <TooltipItem
                  href="/create-collection"
                  pathname={router.pathname}
                  link="/create-collection"
                >
                  Create Collection
                </TooltipItem>
              </Link>
              <TooltipDivider />
              <Link
                route={
                  userId
                    ? "https://import.beta.kauri.io"
                    : `/login?r=https://import.beta.kauri.io`
                }
              >
                <TooltipItem
                  href="https://import.beta.kauri.io"
                  pathname={router.pathname}
                  link="https://import.beta.kauri.io"
                >
                  Import from medium
                </TooltipItem>
              </Link>
            </TooltipItemContainer>
          </Tooltip>
        </StyledMenuItem>

        <StyledMenuItem onlyDesktop>
          <Web3Status />
        </StyledMenuItem>

        <StyledMenuItem key="/profile">
          {userId && userId.length ? (
            <Tooltip
              header={
                <Avatar variant={"white"}>
                  {typeof user.avatar === "string" && user.avatar.length > 1 ? (
                    <ProfileImage avatar={user.avatar} alt="Logo" />
                  ) : (
                    <H6 color={"textPrimary"}>
                      {user.username
                        ? user.username.charAt(0)
                        : typeof user.id === "string"
                        ? user.id.charAt(0)
                        : "Anonymous"}
                    </H6>
                  )}
                </Avatar>
              }
            >
              <TooltipItemContainer>
                <Link route={`/public-profile/${userId}`}>
                  <TooltipItem>Profile</TooltipItem>
                </Link>
                <div style={{ width: "100%", border: "1px solid #f2f2f2" }} />
                <TooltipItem onClick={logout}>Disconnect</TooltipItem>
              </TooltipItemContainer>
            </Tooltip>
          ) : (
            <Tooltip
              header={
                <ProfileMiniature>
                  <Icon type="user" />
                </ProfileMiniature>
              }
            >
              <TooltipItemContainer>
                <Link route={"/login"}>
                  <TooltipItem>Sign in</TooltipItem>
                </Link>
              </TooltipItemContainer>
            </Tooltip>
          )}
        </StyledMenuItem>
        <StyledMenuItem key="/help">
          <Link href="/help">
            <Text href="/help" pathname={router.pathname} link="/help">
              Help
            </Text>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem onlyDesktop key="/contactus">
          <Text
            href="mailto:help@kauri.io"
            pathname={router.pathname}
            link="/contactus"
          >
            Contact Us
          </Text>
        </StyledMenuItem>
      </StyledMenu>
    );
  }
}

export default withRouter(Navbar);
