open Main;
open Vrroom;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover with children text", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Hover
    html={
      <ReactShare.FacebookShareButton
        url="https://www.facebook.com/donate/1937650849680964/" quote="Kauri">
        <ReactShare.FacebookIcon />
      </ReactShare.FacebookShareButton>
    }>
    <span> ("Share" |. text) </span>
  </ReactTippy>
);
myStory.add("Click with facebook share button", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Click
    html={
      <ReactShare.FacebookShareButton
        url="https://www.facebook.com/donate/1937650849680964/" quote="Kauri">
        <ReactShare.FacebookIcon />
      </ReactShare.FacebookShareButton>
    }>
    <span> ("Share" |. text) </span>
  </ReactTippy>
);

myStory.add("Click with facebook and twitter share button", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Click
    html={
      <div>
        <ReactShare.FacebookShareButton
          url="https://www.facebook.com/donate/1937650849680964/"
          quote="Kauri">
          <ReactShare.FacebookIcon />
        </ReactShare.FacebookShareButton>
        <ReactShare.TwitterShareButton
          url="https://www.facebook.com/donate/1937650849680964/"
          title="Kauri">
          <ReactShare.TwitterIcon />
        </ReactShare.TwitterShareButton>
      </div>
    }>
    <span> ("Share" |. text) </span>
  </ReactTippy>
);