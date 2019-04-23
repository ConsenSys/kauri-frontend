import Loading from "../../common/Loading";
import { TertiaryButton } from "../../../../kauri-components/components/Button";

export const CheckpointArticlesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
      fill="#3897F0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7647 11.0714L9.88235 4L6 11.0714L9.88235 16L13.7647 11.0714ZM9.8823 6.24008L12.3689 10.7686L9.8823 11.8947L7.39571 10.7686L9.8823 6.24008ZM11.3343 12.4182L9.88242 13.0751L8.43051 12.4177L9.88242 14.2607L11.3343 12.4182Z"
      fill="white"
    />
  </svg>
);

class CTA extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activated: false,
    };
  }
  componentDidMount () {
    this.loadWeb3();
  }

  async loadWeb3 () {
    const sm = await import("../../../lib/init-smart-contracts");
    sm.initSmartContracts(window.web3, (result, err) => {
      if (err) {
        console.error(err);
        this.setState({ activated: true });
      }
      if (result) {
        this.setState({ activated: true });
      }
    });
  }

  render () {
    if (this.state.activated === false) {
      return <Loading />;
    }
    return (
      <TertiaryButton
        color={"textPrimary"}
        icon={<CheckpointArticlesIcon />}
        onClick={() => this.props.checkpointArticlesAction()}
      >
        {this.props.pageType === "public-profile"
          ? "Submit Articles On-chain"
          : "Submit Article On-chain"}
      </TertiaryButton>
    );
  }
}

export default CTA;
