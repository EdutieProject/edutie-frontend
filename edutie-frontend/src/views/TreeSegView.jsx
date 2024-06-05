import { Button, Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Tree from "../components/Tree.jsx";
import Surface from "../components/Global/Surface";
import ChevronRight from "@material-ui/icons/ChevronRight";

export default function TreeSegView() {
  const theme = useTheme();
  return (
    <NavLayout mode="flex">
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 0.8fr 0.8fr",
          gridTemplateAreas: `"tree" "tree" "footer"`,
        }}
      >
        <Box sx={{ gridArea: "tree" }}>
          <Tree />
        </Box>

        <Box
          justifyContent="center"
          sx={{
            gridArea: "footer",
          }}
        >
          <Surface
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="h5">Zadania</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur sit amet interdum tellus, nec consectetur mi. Nulla et
                efficitur purus, ut faucibus leo. Sed tempus pretium ante
                lobortis dictum. Nunc lorem nisl, laoreet at placerat in,
                tincidunt eget nisl.
              </Typography>
              <Grid
                container
                direction="row"
                columnGap={5}
                alignItems="center"
                justifyContent="flex-start"
                sx={{ marginTop: 2 }}
              >
                <Grid
                  xs="2"
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5">3</Typography>
                  <Typography>LICZBA PODEJŚĆ</Typography>
                </Grid>
                <Grid
                  xs="2"
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5">1</Typography>
                  <Typography>LICZBA ZALICZEŃ</Typography>
                </Grid>
                <Grid
                  xs="2"
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5">74%</Typography>
                  <Typography>ŚREDNI WYNIK</Typography>
                </Grid>
                <Grid
                  xs
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    disableElevation
                    endIcon={<ChevronRight />}
                  >
                    Zobacz poprzednie wyniki
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Surface>
        </Box>
      </Box>
    </NavLayout>
  );
}
