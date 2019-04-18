import React from "react";
import { Link } from "../../../routes";
import Web3Status from "../Web3Status";
import NavSearch from "../QuickSearch";
import { H6 } from "../../../../kauri-components/components/Typography";
import Tooltip from "../../../../kauri-components/components/Tooltip/Tooltip";
import { withRouter } from "next/router";
import Image from "../../../../kauri-components/components/Image";
import analytics from "../../../lib/analytics";
import styled from "../../../lib/styled-components";

const config = require("../../../config").default;

// const supportedNetworkIds = [4, 224895]
// const ONE_SECOND = 1000
// const TWENTY_SECONDS = ONE_SECOND * 20

export const menuHeaderHeight = 76;

const UserIcon = (
  <svg
    width="18"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.46447 15.4645C5.40215 14.5268 6.67392 14 8 14H16C17.3261 14 18.5979 14.5268 19.5355 15.4645C20.4732 16.4021 21 17.6739 21 19V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V19C19 18.2044 18.6839 17.4413 18.1213 16.8787C17.5587 16.3161 16.7956 16 16 16H8C7.20435 16 6.44129 16.3161 5.87868 16.8787C5.31607 17.4413 5 18.2044 5 19V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V19C3 17.6739 3.52678 16.4021 4.46447 15.4645Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
      fill="black"
    />
  </svg>
);

const StyledMenuItem = styled.div`
  display: flex;
  color: #fff !important;
  z-index: 100;

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

const StyledMenu = styled.div`
  display: flex;
  position: relative;
  height: ${menuHeaderHeight}px !important;
  ${props => props.theme.padContent};
  line-height: ${menuHeaderHeight}px !important;
  background-color: ${props =>
    props.navcolor
      ? props.navcolor
      : props.confirmationPage && props.theme.colors.bgPrimary};
  border-bottom-color: ${props => props.navcolor} !important;
  @media (max-width: 500px) {
    padding: 0px 10px;
  }
  > ${StyledMenuItem}:not(:last-child) {
    margin-right: 30px;
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
  margin-left: auto;
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
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  margin-top: 23px;
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
    cursor: pointer;
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
  border-radius: 4px;
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
  render () {
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
  render () {
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
              {/* <TooltipDivider />
              <Link route="/communities">
                <TooltipItem
                  href="/communities"
                  pathname={router.pathname}
                  link="/communities"
                >
                  Communities
                </TooltipItem>
              </Link> */}
              <TooltipDivider />
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
              <Link route={"/write-article"}>
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
                  userId ? "/create-collection" : "/login?r=/create-collection"
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
              {/* <TooltipDivider />

              <Link
                route={
                  userId ? "/create-community" : "/login?r=/create-community"
                }
              >
                <TooltipItem
                  href="/create-community"
                  pathname={router.pathname}
                  link="/create-community"
                >
                  Create Community
                </TooltipItem>
              </Link> */}
              <TooltipDivider />

              <Link
                callback={() =>
                  analytics.track("Open Importer", {
                    category: "generic",
                  })
                }
                route={
                  userId
                    ? `https://import.${config.getApiURL().replace("api.", "")}`
                    : `/login?r=https://import.${config
                      .getApiURL()
                      .replace("api.", "")}`
                }
              >
                <TooltipItem
                  href={`https://import.${config
                    .getApiURL()
                    .replace("api.", "")}`}
                  pathname={router.pathname}
                  link={`https://import.${config
                    .getApiURL()
                    .replace("api.", "")}`}
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
                    <Image
                      image={user.avatar}
                      height={30}
                      width={30}
                      borderRadius="4px"
                    />
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
            <Tooltip header={<ProfileMiniature>{UserIcon}</ProfileMiniature>}>
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
