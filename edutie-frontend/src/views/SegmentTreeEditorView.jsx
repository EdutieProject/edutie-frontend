import NavLayout from "./layout/NavLayout";
import Circle from "../components/global/Circle";
import RoundedButton from "../components/global/RoundedButton.jsx";
import { TextField, Grid, IconButton, Typography, useTheme, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
export default function SegmentTreeEditorView() {
  const theme = useTheme();
  //STAŁA OPISUJĄCA CAŁĄ STRUKTURĘ SEGMENTTREE = {seg1: [name:, description:, parent:, children: []], seg2: [name:, description:, parent:, children: []]...}
  const [focusedSegmentName, setFocusedSegmentName] = useState("Nazwa wybranego segmentu");
  const [focusedSegmentDescription, setFocusedSegmentDescription] = useState("Opis wybranego segmentu"); //REFACTOR NA JEDNA STAŁĄ FOCUSEDSEGMENT = {ID: NAME:, DESCRIPTION: , PARENTID: , CHILDRENIDS: []}
  const cos = { name: "cos", kos: "cos" };
  return (
    <NavLayout>
      <Grid container columns={{ xs: 13 }}>
        <Grid
          item
          xs={7}
          sx={{
            borderColor: "black",
            border: 1,
          }}>
          {/* TUTAJ KOMPONENT DO EDYCJI WIZUALNEJ DRZEWA */}
          <Circle backgroundColor={theme.palette.secondary.main} size="7vw">
            <Typography fontFamily="Baloo" fontSize="4vw" color={"black"}>
              x
            </Typography>
          </Circle>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderColor: "black",
            border: 1,
          }}>
          <Grid
            container
            direction="row"
            sx={{
              alignItems: "flex-start",
            }}>
            <Grid xs={10}>
              <Typography
                onBlur={(e) => setFocusedSegmentName(e.currentTarget.innerText)}
                contentEditable={"true"}
                suppressContentEditableWarning={true}
                variant="h4"
                fontFamily={"Baloo"}
                sx={{
                  marginBottom: theme.spacing(2),
                }}>
                {focusedSegmentName}
              </Typography>
            </Grid>
            <IconButton size="large">
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="row"
            sx={{
              alignItems: "flex-start",
            }}>
            <Grid xs={10}>
              <Typography
                onBlur={(e) => setFocusedSegmentDescription(e.currentTarget.innerText)}
                contentEditable={"true"}
                suppressContentEditableWarning={true}
                sx={{
                  marginBottom: theme.spacing(6),
                }}>
                {focusedSegmentDescription}
              </Typography>
            </Grid>
            <IconButton size="large">
              <EditIcon />
            </IconButton>
          </Grid>
          <Typography
            sx={{
              marginBottom: theme.spacing(1),
            }}
            fontFamily={"Baloo"}>
            Poprzedni segment:
          </Typography>
          <Typography
            sx={{
              marginBottom: theme.spacing(4),
            }}>
            Poprzedni segment nazwa
          </Typography>
          <Typography
            sx={{
              marginBottom: theme.spacing(1),
            }}
            fontFamily={"Baloo"}>
            Następne segmenty:
          </Typography>
          {/* MAP NEXT SEGMENTS */}
          <Grid
            container
            direction="row"
            sx={{
              alignItems: "center",
              marginBottom: theme.spacing(15),
            }}>
            <IconButton size="large">
              <AddCircleOutlineIcon />
            </IconButton>
            <Typography>Dodaj następny segment</Typography>
          </Grid>
          <Grid sx={{ textAlign: "center" }}>
            <RoundedButton label={"Zobacz definicje"} active={true}></RoundedButton>
          </Grid>
        </Grid>
      </Grid>
    </NavLayout>
  );
}
