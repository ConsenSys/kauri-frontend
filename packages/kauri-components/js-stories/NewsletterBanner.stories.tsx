import { storiesOf } from "@storybook/react";
import NewsletterBanner from "../components/NewsletterBanner";
import React from "react";

storiesOf("NewsletterBanner", module).add("Full width", () => (
  <NewsletterBanner
    handleSubmit={emailAddress => {
      alert(emailAddress);
      return;
    }}
    handleError={() => {
      alert("A valid email address is required!");
      return;
    }}
  />
));
