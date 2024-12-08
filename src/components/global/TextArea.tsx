import { SxProps, TextField, useTheme } from "@mui/material";
import React from "react";
type SxProps = typeof SxProps;
interface Props {
  label?: string;
  value?: string;
  onChange?: (e: any) => void;
  maxRows?: number;
  minRows?: number;
  sx?: SxProps;
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
        ...props.sx,
      }}
      onChange={props.onChange}
    />
  );
}
