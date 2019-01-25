import styled from '../../lib/styled-components';


export interface INFT {
    contractAddress: string;
    description: string;
    externalUrl: string;
    image: string;
    name: string;
    tokenType: string;
}

interface IProps {
    nfts: INFT[];
    nftSize: number;
    clickable?: boolean;
}

const NFT = styled<{ image: string, size: number }, "div">("div")`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    background: url(${props => props.image}) center center;
    background-size: contain;
    background-repeat: no-repeat;
    transition: all 0.3s;
    margin: ${props => props.theme.space[1]}px;
    margin-left: 0;
`;

const NFTs = styled<{}, "div">("div")`
    display: flex;
    flex-direction: row;
    
    & > a {
        margin-right: ${props => props.theme.space[1]}px;
    }
`;

const NFTList = (props: IProps) => props.clickable ?
    <NFTs>{props.nfts.map(nft => <a key={nft.tokenType} href={nft.externalUrl} target="_blank"><NFT title={nft.name}  image={nft.image} size={props.nftSize} /></a>)}</NFTs> :
    <NFTs>{props.nfts.map(nft => <NFT key={nft.tokenType} title={nft.name}  image={nft.image} size={props.nftSize} />)}</NFTs>;

export default NFTList;