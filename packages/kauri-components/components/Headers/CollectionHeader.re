let component = ReasonReact.statelessComponent("CollectionHeader");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        flexDirection(row),
        zIndex(1),
        media(
          "only screen and (max-width: 500px)",
          [flexDirection(column), padding(px(10))],
        ),
      ])
    );

  let leftSide =
    Css.(
      style([
        display(`flex),
        flex(3),
        flexDirection(column),
        color(hex("ffffff")),
      ])
    );

  let rightSide =
    Css.(
      style([
        display(`flex),
        flex(1),
        alignItems(`center),
        flexDirection(column),
        selector("> button:last-child", [marginTop(px(24))]),
      ])
    );
};

let make =
    (
      ~id,
      ~name,
      ~description,
      ~username,
      ~userId,
      ~userAvatar,
      ~ownerId,
      ~linkComponent=?,
      /* ~profileImage=?, */
      ~updated,
      ~url,
      ~routeChangeAction=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.leftSide>
        <PostedDate date_field=updated dateType=PostedDate.Updated />
        <Heading size=28 text=name color="ffffff" />
        <Paragraph cardHeight=9000 size=16 text=description color="ffffff" />
        <ShareArticle url title=name />
      </div>
      <div className=Styles.rightSide>
        <Label text="Curator" color="ffffff" />
        {
          Belt.Option.mapWithDefault(
            linkComponent,
            <UserAvatar
              variant=`White
              username=username->Belt.Option.getWithDefault(ownerId)
              userAvatar=userAvatar->Belt.Option.getWithDefault("")
              fullWidth=true
              userId=ownerId
            />,
            linkComponent =>
            linkComponent(
              <UserAvatar
                variant=`White
                fullWidth=true
                username=username->Belt.Option.getWithDefault(ownerId)
                userAvatar=userAvatar->Belt.Option.getWithDefault("")
                userId=ownerId
              />,
            )
          )
        }
        {
          userId === ownerId ?
            <PrimaryButton
              onClick={
                _ =>
                  routeChangeAction
                  ->Belt.Option.getWithDefault(
                      _ => (),
                      {j|/collection/$id/update-collection|j},
                    )
              }>
              <span> "Update Collection"->ReasonReact.string </span>
            </PrimaryButton> :
            ReasonReact.null
        }
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  date: string,
  name: string,
  description: string,
  username: Js.Nullable.t(string),
  userAvatar: Js.Nullable.t(string),
  url: string,
  id: string,
  userId: string,
  ownerId: string,
  profileImage: string,
  updated: string,
  routeChangeAction: string => unit,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~id=jsProps->idGet,
      ~name=jsProps->nameGet,
      ~description=jsProps->descriptionGet,
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~userAvatar=jsProps->userAvatarGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~ownerId=jsProps->ownerIdGet,
      ~linkComponent=jsProps->linkComponentGet,
      ~url=jsProps->urlGet,
      /* ~profileImage=jsProps->profileImageGet, */
      ~updated=jsProps->updatedGet,
      ~routeChangeAction=jsProps->routeChangeActionGet,
      [||],
    )
  );