import styled from '../../lib/styled-components';
import { Article_associatedNfts } from '../../../kauri-web/queries/__generated__/Article'


interface IProps {
    nfts: Array<Article_associatedNfts | null> | null;
    nftSize: number;
    clickable?: boolean;
}

const NFT = styled<{ image: string | null, size: number }, "div">("div")`
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
    <NFTs>{props.nfts && props.nfts.map((nft, index) => nft ? <a key={index} href={nft.externalUrl || undefined} target="_blank"><NFT title={nft.name || undefined}  image={nft.image} size={props.nftSize} /></a> : null)}</NFTs> :
    <NFTs>{props.nfts && props.nfts.map((nft, index) => nft ? <NFT key={index} title={nft.name || undefined}  image={nft.image } size={props.nftSize} /> : null)}</NFTs>;

export default NFTList;