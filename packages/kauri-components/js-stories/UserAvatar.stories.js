// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import UserAvatar from "../components/UserAvatar";

storiesOf("UserAvatar", module)
  .add("userid, without imageurl", () => (
    <UserAvatar userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"} />
  ))
  .add("with imageurl, with short username", () => (
    <UserAvatar
      avatar={
        "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      }
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"rej156"}
    />
  ))
  .add("with imageurl, with long username", () => (
    <UserAvatar
      avatar={
        "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      }
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"LongUsernameGoesHere"}
    />
  ))
  .add("with imageurl, with long username, fullWidth", () => (
    <UserAvatar
      avatar={
        "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
      }
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"LongUsernameGoesHere"}
      fullWidth
    />
  ))
  .add("without imageurl, with normal username", () => (
    <UserAvatar
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"rej156"}
    />
  ))
  .add("without imageurl, with long username", () => (
    <UserAvatar
      userId={"bfecec47dd8bf5f6264a9830a9d26ef387c38a67"}
      username={"LongUsernameGoesHere"}
    />
  ));
