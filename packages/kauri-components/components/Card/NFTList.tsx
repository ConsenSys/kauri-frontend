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
    
    & > a {
        margin-right: ${props => props.theme.space[1]}px;
    }
`;

const NFTList = (props: IProps) => <NFTs>{props.nfts.map(nft => <a key={nft.tokenName} href={nft.externalUrl} target="_blank"><NFT  image={nft.image} size={props.nftSize} /></a>)}</NFTs>

export default NFTList;