open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Article", ~decorators=[], ~_module, ());

myStory.add("Click for dropdown", () =>
  <div
    className="DummyContainerForTippy"
    style=(ReactDOMRe.Style.make(~display="flex", ~width="100%", ()))>
    <ShareArticle
      url="https://www.facebook.com/donate/1937650849680964/"
      title="Kauri"
    />
  </div>
);