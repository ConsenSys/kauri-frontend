export interface INFT {
    contractAddress: string;
    description: string;
    externalUrl: string;
    image: string;
    name: string;
    tokenName: string;
}

interface IProps {
    nfts: INFT[]
}
const NFTList = (props: IProps) => <div>{props.nfts.map(i => i.name)}</div>

export default NFTList;