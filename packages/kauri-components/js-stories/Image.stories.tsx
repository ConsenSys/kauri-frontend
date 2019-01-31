import { storiesOf } from "@storybook/react";
import Image from "../components/Image";
import React from "react";

storiesOf("Image", module)
  .add("FadeIn", () => (
    <>
      <div style={{ height: 1000 }}>Scroll down</div>
      <Image
        image="https://api.beta.kauri.io:443/ipfs/QmRQriW8kcBsYF1onGvVDCn7sZiwktBvie5oCH14KSaY4z"
        height={100}
        width={100}
        borderRadius="40px"
      />
    </>
  ))
  .add("Overlay", () => (
    <Image
      image="https://api.beta.kauri.io:443/ipfs/QmRQriW8kcBsYF1onGvVDCn7sZiwktBvie5oCH14KSaY4z"
      height={100}
      width={100}
      borderRadius="50px"
      borderTopLeftRadius="2px"
      overlay={{ opacity: 0.5, color: "red" }}
    />
  ));
