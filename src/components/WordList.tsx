import React from "react";
import { List } from "@material-ui/core";
import WordListItem from "./WordListItem";

type Props = {
  wordList: any;
  handleClick: (word: string) => void;
};

const WordList = (props: Props) => {
  return (
    <List>
      {props.wordList?.map((row: any) => {
        return (
          <WordListItem
            id={row.id}
            word={row.word}
            meaning={row.meaning}
            handleClick={() => {
              props.handleClick(row.word);
            }}
          />
        );
      })}
    </List>
  );
};

export default WordList;
