import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

type Props = {
  id: number;
  word: string;
  meaning: string;
  handleClick: () => void;
};

const WordListItem = (props: Props) => {
  return (
    <ListItem key={props.id}>
      <TextField defaultValue={props.word} />
      <ListItemText primary={props.meaning} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={props.handleClick}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default WordListItem;
