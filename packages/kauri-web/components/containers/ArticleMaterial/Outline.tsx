import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import { useState } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

interface IProps {
  markdown: string;
}

interface IOutlineItems {
  level: number;
  children: any[];
  content: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  nested: {
    paddingLeft: theme.spacing(2),
  },
}));

const GenerateList = ({ mapped, classes, nested }: any) => (
  <List className={nested && classes.nested} dense={true}>
    {mapped.map((i: any, key: number) => (
      <>
        <ListItem key={key}>
          <ListItemText primary={i.content} />
        </ListItem>
        {i.children.length > 0 && (
          <GenerateList nested={true} classes={classes} mapped={i.children} />
        )}
      </>
    ))}
  </List>
);

const Outline = ({ markdown }: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const split = markdown.split("\n");
  const filtered = split.filter(i => i[0] === "#");
  const mapped = filtered
    .map(str => {
      const [hashes, content] = str.split(/(?<=^\S+)\s/);

      return {
        children: [],
        content: content && content.trim(),
        level: hashes.length,
      };
    })
    .reduce(
      (all, item, index) => {
        let length = all.length;
        if (index === 0 || item.level === 1) {
          all.push(item);
        } else {
          while (length--) {
            if (all[length].level === item.level - 1) {
              all[length].children.push(item);
              break;
            }
          }
        }
        return all;
      },
      [] as IOutlineItems[]
    );

  return (
    <div className={classes.container}>
      <ListItem onClick={() => setOpen(!open)}>
        <ListItemText>Contents</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit={true}>
        <GenerateList classes={classes} mapped={mapped} />
      </Collapse>
    </div>
  );
};

export default Outline;
