open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Social Website Icon", ~decorators=[], ~_module, ());

myStory.add("Github", () =>
  <SocialWebsiteIcon
    socialURL="https://twitter.com/rej156"
    height=None
    brand="github"
  />
);
myStory.add("Twitter", () =>
  <SocialWebsiteIcon
    socialURL="https://twitter.com/rej156"
    height=None
    brand="twitter"
  />
);

myStory.add("LinkedIn with height prop", () =>
  <SocialWebsiteIcon
    socialURL="https://twitter.com/rej156"
    height=(Some("30"))
    brand="linkedin"
  />
);

myStory.add("Social Websites", () =>
  <SocialWebsites>
    <SocialWebsiteIcon
      socialURL="https://twitter.com/rej156"
      height=None
      brand="linkedin"
    />
    <SocialWebsiteIcon
      socialURL="https://twitter.com/rej156"
      height=None
      brand="twitter"
    />
    <PersonalWebsite website="www.personalwebsite.com" />
  </SocialWebsites>
);