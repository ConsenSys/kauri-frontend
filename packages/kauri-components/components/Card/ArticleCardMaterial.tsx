import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from "@material-ui/core";
import { Theme, makeStyles} from "@material-ui/core/styles"
import moment from "moment"
import { Link } from "../../../kauri-web/routes";

interface IProps {
    title: string | null;
    author: {
        name: string | null;
        username: string | null;
        id: string | null;
        avatar: string | null;
    } | null
    attributes: {
        background?: string;
    }
    datePublished: string | null
    description: string | null
    href?: string;
    className?: string;
}

export const ArticleCardStyles = makeStyles((theme: Theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        textTransform: 'uppercase'
    },
    card: {
    },
    content: {
        cursor: 'pointer',
        height: '100%',
    },
    header: {
        cursor: 'pointer'
    },
    media: {
        cursor: 'pointer',
        height: 160,
    },
  }));

export default ({
    author,
    title,
    attributes,
    datePublished,
    description,
    href,
    className
}: IProps) => {
    const classes = ArticleCardStyles();
    return <Card className={`${classes.card} ${className ? className : ''}`}>
            <Link useAnchorTag={true} href={`/public-profile/${author && author.id}`}>
                <CardHeader
                    className={classes.header}
                    avatar={
                        author && author.avatar ? <Avatar src={author && author.avatar} /> : <Avatar className={classes.avatar} aria-label={String(author && author.username)}>
                            {author && author.username && author.username.charAt(0)}
                        </Avatar>
                    }
                    title={author && (author.name || author.username || author.id)}
                    subheader={moment(String(datePublished)).fromNow()}
                />
            </Link>
            <Link useAnchorTag={true} href={href}>
                <>
                    {attributes && attributes.background && <CardMedia
                        className={classes.media}
                        image={attributes.background}
                        title={String(title)}
                    />}
                    <CardContent className={classes.content}>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {String(description && description.length < 160 ? description : description && `${description.substring(0, 157)}...`)}
                        </Typography>
                    </CardContent>
                </>
            </Link>
        </Card>
};