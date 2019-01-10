import styled from '../../lib/styled-components';


export interface INFT {
    contractAddress: string;
    description: string;
    externalUrl: string;
    image: string;
    name: string;
    tokenName: string;
}

interface IProps {
    nfts: INFT[];
    nftSize: number;
}

const NFT = styled<{ image: string, size: number }, "div">("div")`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    background: url(${props => props.image}) center center;
    background-size: contain;
    background-repeat: no-repeat;
`;

const NFTs = styled<{}, "div">("div")`
    display: flex;
    flex-direction: row;
    
    & > div {
        margin-right: ${props => props.theme.space[1]}px;
    }
`;

const NFTList = (props: IProps) => <NFTs>{props.nfts.map(i => <NFT key={i.tokenName} image={i.image} size={props.nftSize} />)}</NFTs>

export default NFTList;