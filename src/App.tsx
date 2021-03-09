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
    { word: "sample", meaning: "サンプル" },
  ]);
  const [input, setInput] = useState("default");
  const [target, setTarget] = useState("");

  useEffect(() => {
    const fetchData = () => {
      // async/awaitに書き換える
      axios
        .post(
          // 環境ファイルに切り出す
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
      <Typography variant="h6">単語リスト</Typography>
      <List>
        {wordList.map((word, index) => {
          return (
            <ListItem key={index}>
              <TextField defaultValue={word.word} />
              <ListItemText primary={word.meaning} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    setWordList(
                      wordList.filter((_, targetIndex) => index !== targetIndex)
                    )
                  }
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
