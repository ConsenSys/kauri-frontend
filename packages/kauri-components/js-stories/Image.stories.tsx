import { storiesOf } from "@storybook/react";
import Image from "../components/Image";
import React from "react";

storiesOf("Image", module).add("FadeIn", () => (
  <>
    <div style={{ height: 1000 }}>Scroll down</div>
    <Image
      image="https://images.unsplash.com/photo-1548600916-dc8492f8e845?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
      height="100px"
      width="100px"
      borderRadius="40px"
    />
  </>
));
