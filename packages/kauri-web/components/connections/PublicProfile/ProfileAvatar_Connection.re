open Infix_Utilities;

let component = ReasonReact.statelessComponent("ProfileAvatarQuery");

let make = (~userId, _children) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let getUserQuery = GetUser.make(~userId, ());
    <GetUserQuery variables=getUserQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => ReasonReact.null
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               <ProfileAvatar
                 username=(
                   response##getUser
                   |? (user => user##username)
                   |> default(
                        response##getUser
                        |? (user => user##user_id)
                        |> default("Unknown Writer"),
                      )
                 )
                 pageType=RinkebyPublicProfile
               />
             }
         )
    </GetUserQuery>;
  },
};