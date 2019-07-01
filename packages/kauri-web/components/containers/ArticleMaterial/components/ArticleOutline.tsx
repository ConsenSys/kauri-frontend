import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
export const OutlineStyles = makeStyles((theme: Theme) => ({
  H2: {
    borderLeft: `4px solid transparent`,
    cursor: "pointer",
    marginLeft: 0,
    paddingLeft: theme.spacing(1),
    transition: "all 0.3s",
  },
  H3: {
    borderLeft: `4px solid transparent`,
    cursor: "pointer",
    marginLeft: 0,
    paddingLeft: theme.spacing(3),
    transition: "all 0.3s",
  },
  active: {
    borderLeft: `4px solid ${theme.palette.primary.main} !important`,
  },
  list: {},
  listItem: {
    padding: theme.spacing(1),
  },
}));

const ArticleOutline = () => {
  const elements = Array.from(document.querySelectorAll("h2,h3"));
  const [titles] = useState(
    elements.map((element: Element) => ({
      offsetTop: element.getBoundingClientRect().top - 80,
      tagName: element.tagName as "H2" | "H3",
      title: element.textContent,
    }))
  );
  const [active, setActive] = useState(-1);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const classes = OutlineStyles();

  const handleScroll = () => {
    const index = titles.findIndex(title => title.offsetTop > window.scrollY);
    setActive(index);
  };

  return (
    <List className={classes.list} dense={true}>
      <Typography variant="h6">Contents</Typography>
      {titles.map((element, index) => {
        return (
          <ListItem className={classes.listItem} key={index}>
            <Typography variant="caption"
              onClick={() => {
                window.scrollTo(0, element.offsetTop);
              }}
              className={`${classes[element.tagName]} ${
                index === active ? classes.active : ""
              }`}
            >
              {element.title}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ArticleOutline;
