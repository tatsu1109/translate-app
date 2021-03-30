import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Dexie, { Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import WordListComponent from "./components/WordList";
import InputWord from "./components/InputWord";

interface WordList {
  id: number;
  word: string;
  meaning: string;
}

class WordListDB extends Dexie {
  wordList!: Table<WordList, string>;

  constructor() {
    super("wordListDB");
    this.version(1).stores({
      wordList: `
        ++id,
        word,
        meaning`,
    });
  }
}

const db = new WordListDB();

const App = () => {
  const wordList = useLiveQuery(() => db.wordList.toArray(), []);
  const [input, setInput] = useState("default");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (target !== "") {
      const fetchData = async () => {
        setLoading(true);
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
        db.wordList
          .add({
            id: typeof wordList === "undefined" ? 0 : wordList.length,
            word: target,
            meaning: res.data.message,
          })
          .catch((err) => console.error(err));
        setLoading(false);
      };
      fetchData();
    }
  }, [target]);

  return (
    <div>
      <Typography variant="h6">単語リスト</Typography>
      <button onClick={() => db.wordList.clear()}>Clear</button>
      <WordListComponent
        wordList={wordList}
        handleClick={(target: string) => {
          db.wordList.delete(target);
        }}
      />
      <InputWord
        input={input}
        loading={loading}
        handleChange={(event: any) => setInput(event.target.value)}
        handleClick={() => {
          setTarget(input);
          setInput("");
        }}
      />
    </div>
  );
};

export default App;
