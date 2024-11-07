import katex from "katex";
import "katex/dist/katex.min.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import KaTeX from "./KaTeX";
import TextArea from "./TextArea";
import { Button } from "@mui/material";

export default function MathKeyboard() {
  const [textAreaValue, setTextAreaValue] = useState("");
  return (
    <>
      <Button
        onClick={(e: any) => {
          let mathChar = katex.renderToString("sqrt{}");
          console.log(mathChar);
          setTextAreaValue(mathChar);
        }}>
        <KaTeX texExpression="\sqrt{}"></KaTeX>
      </Button>
      <TextArea
        value={textAreaValue}
        onChange={(e: any) => {
          setTextAreaValue(e.target.value);
        }}></TextArea>
      <KaTeX texExpression="\sqrt{3}"></KaTeX>
    </>
  );
}
