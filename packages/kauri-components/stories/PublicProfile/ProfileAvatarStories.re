open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Profile Avatar", ~decorators=[], ~_module, ());

myStory.add("White", () =>
  <ProfileAvatar
    avatarURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAADiCAMAAAD5w+JtAAAAFVBMVEX////x8fHf39/8/Pze3t74+PjV1dWWM0v9AAABI0lEQVR4nO3RiQ2DQAADwXsg/ZdMFQjtZaYCrzzGye799YJ3rfn1gnddh/ed/p++Nn1t+tr0telr09emr01fm742fW362vS16WvT16avTV+bvjZ9bfra9LXpa9PXpq9NX5u+Nn1t+tr0telr09emr01fm742fW362vS16WvT16avTV+bvjZ9bfra9LXpa9PXpq9NX5u+Nn1t+tr0telr09emr01fm742fW362vS16WvT16avTV+bvjZ9bfra9LXpa9PXpq9NX5u+Nn1t+tr0telr09emr01fm742fW362vS16WvT16avTV+bvjZ9bfra9LXpa9PXpq9NX5u+Nn1t+tr0telr09emr01fm742fW362vS16Wv7g757XetYvzn2PNl+AKKdBVHpPv+mAAAAAElFTkSuQmCC"
  />
);
myStory.add("With Eric", () =>
  <ProfileAvatar
    avatarURL="https://pbs.twimg.com/profile_images/904695589572632576/Wl3HbVK0_400x400.jpg"
  />
);
myStory.add("With Craig and his parrot", () =>
  <ProfileAvatar avatarURL="https://kauri.io/img/craig.png" />
);
myStory.add("Fat ass Rinkeby one", () =>
  <ProfileAvatar username="npka212" pageType=RinkebyPublicProfile />
);