import { Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Tree from "../components/Tree.jsx";
import Surface from "../components/global/Surface";
import { useState } from "react";
import CircleButton from "../components/global/CircleButton.jsx";
import RoundedButton from "../components/global/RoundedButton.jsx";
import { useParams } from "react-router-dom";

export default function TreeSegView({ }) {
  const theme = useTheme();
  const { lessonId } = useParams();
  const [childData, setChildData] = useState({ data: null });
  const childToParent = (data) => {
    setChildData(data);
  };

  if (childData.data === null) {
    return (
      <NavLayout mode="flex">
        <Tree childToParent={childToParent} lessonId={lessonId} />
      </NavLayout>
    );
  }
  return (
    <NavLayout mode="flex">
      <Box
        sx={{
          flexGrow: 1,
          boxSizing: "border-box",
          display: "grid",
          gridTemplateRows: "repeat(3, 1fr)",
          gridTemplateAreas: `"tree" "tree" "footer"`,
        }}
      >
        <Box sx={{ gridArea: "tree", display: "flex", alignItems: "center" }}>
          <Tree childToParent={childToParent} lessonId={lessonId} />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            gridArea: "footer",
          }}
        >
          <Surface>
            <Typography fontFamily="Baloo" variant="h4">
              Zadania - {childData.segment.name}
            </Typography>
            <Typography>{childData.segment.snippetDescription}</Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={2}>
                <Typography
                  fontFamily="Baloo"
                  sx={{ textAlign: "center" }}
                  variant="h4"
                >
                  {childData.approachesTaken}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  LICZBA PODEJŚĆ
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  fontFamily="Baloo"
                  sx={{ textAlign: "center" }}
                  variant="h4"
                >
                  {childData.approachesSucceeded}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  LICZBA ZALICZEŃ
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  fontFamily="Baloo"
                  sx={{ textAlign: "center" }}
                  variant="h4"
                >
                  74%
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  ŚREDNI WYNIK
                </Typography>
              </Grid>
              <Grid item>
                <RoundedButton
                  label={"Zobacz poprzednie wyniki"}
                  active={true}>
                </RoundedButton>
              </Grid>
              <Grid item>
                <CircleButton size={theme.spacing(3)} onClick={() => console.log("1!")}>
                  <Typography fontFamily={"Baloo"} fontSize={36} color={theme.palette.common.white}>{">"}</Typography>
                </CircleButton>
              </Grid>
            </Grid>
          </Surface>
        </Box>
      </Box>
    </NavLayout>
  );
}
