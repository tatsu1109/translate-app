import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Delete, AddCircleOutline } from "@material-ui/icons";
import axios from "axios";

const App = () => {
  const [wordList, setWordList] = useState([
    { word: "implication", meaning: "意味あい、暗示するもの" },
  ]);
  const [input, setInput] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(
          "https://en94fvkrmd.execute-api.ap-northeast-1.amazonaws.com/default/translate",
          {
            text: target,
            sourceLanguage: "en",
            targetLanguage: "ja",
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((response) =>
          setWordList([
            ...wordList,
            { word: target, meaning: response.data.message },
          ])
        )
        .catch((error) => {
          console.info(error);
        });
    };
    fetchData();
  }, [target]);

  return (
    <div>
      <Typography variant="h6">Avatar with text and icon</Typography>
      <List>
        {wordList.map((word) => {
          return (
            <ListItem>
              <TextField defaultValue={word.word} />
              <ListItemText primary={word.meaning} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <div>
        <TextField onChange={(event) => setInput(event.target.value)} />
        <IconButton
          onClick={() => {
            setTarget(input);
          }}
        >
          <AddCircleOutline />
        </IconButton>
      </div>
    </div>
  );
};

export default App;
