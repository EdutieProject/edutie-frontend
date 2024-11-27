import NavLayout from "./layout/NavLayout";
import MathKeyboard from "../components/global/MathKeyboard";
import React from "react";
import { Typography } from "@mui/material";
import "katex/dist/katex.min.css";

export default function PlaygroundView() {
  return (
    <NavLayout>
      <Typography fontFamily={"Baloo"} variant="h4">
        Klawiatura matematyczna
      </Typography>
      <MathKeyboard></MathKeyboard>
    </NavLayout>
  );
}
