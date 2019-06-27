import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { OutlineStyles } from "./styles";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const ArticleOutline = () => {
  const elements = Array.from(document.querySelectorAll("h2,h3"));
  const [titles] = useState(
    elements.map((element: Element) => ({
      active: false,
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
    <List dense={true}>
      <Typography variant="h6">Contents</Typography>
      {titles.map((element, index) => {
        return (
          <ListItem key={index}>
            <ListItemText
              onClick={() => {
                window.scrollTo(0, element.offsetTop);
              }}
              className={`${classes[element.tagName]} ${
                index === active ? classes.active : ""
              }`}
            >
              {element.title}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ArticleOutline;
