import katex from "katex";
import "katex/dist/katex.min.css";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function KaTeX({ texExpression }: { texExpression: string }) {
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    katex.render(texExpression, containerRef.current as HTMLInputElement);
  }, [texExpression]);

  return <div contentEditable ref={containerRef} />;
}
