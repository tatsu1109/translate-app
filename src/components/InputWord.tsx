import React from "react";
import { IconButton, TextField, CircularProgress } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

type Props = {
  input: string;
  loading: boolean;
  handleClick: () => void;
  handleChange: (event: any) => void;
};

const InputWord = (props: Props) => {
  return (
    <div>
      <TextField
        id="TranslateWord"
        value={props.input}
        onChange={props.handleChange}
      />
      <IconButton id="TranslateExec" onClick={props.handleClick}>
        <AddCircleOutline />
      </IconButton>
      {props.loading && <CircularProgress size={24} />}
    </div>
  );
};

export default InputWord;
