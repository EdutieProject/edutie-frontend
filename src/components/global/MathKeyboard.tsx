import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextArea from "./TextArea";
import katex from "katex";
import "katex/dist/katex.min.css";
import MarkdownLaTeXRenderer from "../markdown/MarkdownLaTexRenderer";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import KaTeX from "./KaTeX";

export default function MathKeyboard() {
  const [textAreaValue, setTextAreaValue] = useState("");

  return (
    <>
      <Button
        onClick={async () => {
          const num = prompt("Jaką liczbę chcesz spierwiastkować?");
          if (num) {
            await setTextAreaValue((prevValue) => prevValue + "\\sqrt{" + num + "}");
          }
        }}>
        Wstaw pierwiastek
      </Button>
      <Button
        onClick={() => {
          setTextAreaValue((prevValue) => prevValue + "\\frac 1 8");
        }}>
        Ułamek
      </Button>
      <KaTeX texExpression={textAreaValue}></KaTeX>
      <TextArea
        value={textAreaValue}
        minRows={2}
        maxRows={5}
        onChange={(e: any) => setTextAreaValue(e.target.value)}></TextArea>
    </>
  );
}
