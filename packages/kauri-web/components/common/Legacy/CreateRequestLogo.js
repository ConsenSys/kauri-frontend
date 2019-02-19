export const CreateRequestLogo = ({
  chosenCategory,
  height,
  width,
  avatarWidth,
  avatarHeight,
  type,
}: IProps) => (
  <Mask
    chosenCategory={chosenCategory}
    height={height}
    width={width}
    type={type}
  >
    {chosenCategory ? (
      <Logo
        avatarHeight={type === "article" ? 46 : avatarHeight}
        avatarWidth={type === "article" ? 46 : avatarWidth}
        src={`/static/images/${chosenCategory}/avatar.png`}
      />
    ) : (
      <Logo
        avatarHeight={type === "article" ? 46 : avatarHeight}
        avatarWidth={type === "article" ? 46 : avatarWidth}
        src={`/static/images/help-logo.svg`}
      />
    )}
  </Mask>
);
