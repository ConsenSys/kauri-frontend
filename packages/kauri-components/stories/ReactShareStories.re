open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Buttons", ~decorators=[], ~_module, ());

myStory.add("Facebook", () =>
  <ReactShare.FacebookShareButton
    url="https://www.facebook.com/donate/1937650849680964/" quote="Kauri">
    <ReactShare.FacebookIcon />
  </ReactShare.FacebookShareButton>
);

myStory.add("Twitter", () =>
  <ReactShare.TwitterShareButton
    url="https://edition.cnn.com/2018/07/26/asia/laos-dam-collapse-intl/index.html"
    title="Kauri">
    <ReactShare.TwitterIcon />
  </ReactShare.TwitterShareButton>
);

myStory.add("LinkedIn", () =>
  <ReactShare.LinkedinShareButton
    url="https://www.channelnewsasia.com/news/asia/singapore-scdf-officers-to-laos-relief-efforts-dam-collapse-10562862"
    title="Kauri">
    <ReactShare.LinkedinIcon />
  </ReactShare.LinkedinShareButton>
);