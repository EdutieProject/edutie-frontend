import { Button, Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Tree from "../components/Tree.jsx";
import Surface from "../components/global/Surface";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { useState } from "react";

export default function TreeSegView() {
  const theme = useTheme();
  const [exercise, setExercise] = useState();
  const [childData, setChildData] = useState({ data: null });
  const childToParent = (data) => {
    setChildData(data);
  };
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
        <Box sx={{ gridArea: "tree" }}>
          <Tree childToParent={childToParent} />
          {console.log(childData)}
        </Box>
        <Box
          sx={{
            marginTop: 2,
            gridArea: "footer",
          }}
        >
          <Surface>
            <Typography fontFamily="Baloo" variant="h4">
              Zadania
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sit amet interdum tellus, nec consectetur mi. Nulla et efficitur
              purus, ut faucibus leo. Sed tempus pretium ante lobortis dictum.
              Nunc lorem nisl, laoreet at placerat in, tincidunt eget nisl.
            </Typography>
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
                  3
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
                  1
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
                <Button
                  style={{ borderRadius: 50 }}
                  sx={{ boxShadow: theme.shadows[4] }}
                  variant="contained"
                  disableElevation
                  endIcon={<ChevronRight />}
                >
                  Zobacz poprzednie wyniki
                </Button>
              </Grid>
            </Grid>
          </Surface>
        </Box>
      </Box>
    </NavLayout>
  );
}
