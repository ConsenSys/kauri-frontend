open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Profile Badges", ~decorators=[], ~_module, ());

myStory.add("Github", () =>
  <ProfileBadge
    badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
  />
);

myStory.add("Vimeo", () =>
  <ProfileBadge
    badgeURL="https://unpkg.com/simple-icons@latest/icons/vimeo.svg"
  />
);

myStory.add("Zeppelin", () =>
  <ProfileBadge badgeURL="https://kauri.io/img/zeppelin.png" />
);

myStory.add("Spotify", () =>
  <ProfileBadge
    badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
  />
);

myStory.add("Profile Badges", () =>
  <ProfileBadges header="Badges">
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
    />
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
    />
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
    />
  </ProfileBadges>
);

myStory.add("Profile Contributor Badges", () =>
  <ProfileBadges header="Contributor">
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
    />
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
    />
    <ProfileBadge
      badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
    />
  </ProfileBadges>
);

myStory.add("Attributions", () =>
  <Attributions>
    <ProfileBadges header="Badges">
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
      />
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
      />
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
      />
    </ProfileBadges>
    <ProfileBadges header="Contributor">
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
      />
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
      />
      <ProfileBadge
        badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
      />
    </ProfileBadges>
  </Attributions>
);