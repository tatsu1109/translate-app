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
import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

interface WordList {
  word: string;
  meaning: string;
}

class WordListDB extends Dexie {
  wordList!: Table<WordList, string>;

  constructor() {
    super("wordListDB");
    this.version(1).stores({
      wordList: `
        word,
        meaning`,
    });
  }
}

const db = new WordListDB();

const App = () => {
  const wordList = useLiveQuery(() => db.wordList.toArray());
  const [input, setInput] = useState("default");
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (target !== "") {
      const fetchData = async () => {
        const res = await axios.post(
          `${process.env.REACT_APP_AWS_API}/default/translate`,
          {
            text: target,
            sourceLanguage: "en",
            targetLanguage: "ja",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        db.wordList?.add({ word: target, meaning: res.data.message });
        // .catch((err) => console.error(err));
      };
      fetchData();
    }
  }, [target]);

  return (
    <div>
      <Typography variant="h6">単語リスト</Typography>
      <button onClick={() => db.wordList.clear()}>Clear</button>
      <List>
        {wordList?.map((row, index) => {
          return (
            <ListItem key={index}>
              <TextField defaultValue={row.word} />
              <ListItemText primary={row.meaning} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    db.wordList.delete(row.word);
                  }}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <div>
        <TextField
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <IconButton
          onClick={() => {
            setTarget(input);
            setInput("");
          }}
        >
          <AddCircleOutline />
        </IconButton>
      </div>
    </div>
  );
};

export default App;
