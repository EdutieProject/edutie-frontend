import { TextField, useTheme } from "@mui/material";
import React from "react";
interface Props {
  label?: string;
  value?: string;
  onChange?: (e: any) => void;
  maxRows?: number;
  minRows?: number;
}

export default function TextArea(props: Props) {
  const theme = useTheme();
  return (
    <TextField
      value={props.value}
      label={props.label}
      multiline
      fullWidth
      maxRows={props.maxRows}
      minRows={props.minRows}
      sx={{
        backgroundColor: theme.palette.common.white,
        borderRadius: 1,
        "& fieldset:enabled": {
          border: 0,
        },
      }}
      onChange={props.onChange}
    />
  );
}
