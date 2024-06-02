import { Button, Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Tree from "../components/Tree.jsx";
import Surface from "../components/Global/Surface";
import ChevronRight from "@material-ui/icons/ChevronRight";

export default function TreeSegView() {
  const theme = useTheme();
  return (
    <NavLayout>
      <Grid container direction="row" spacing={2} marginTop={theme.spacing(4)}>
        <Box
          sx={{
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
              border: "1px solid",
              borderColor: "black",
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
                <Typography variant="h5">
                  Zadania
                  {/* Zadania - {dane[lessonMain].name} */}
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sit amet interdum tellus, nec consectetur mi. Nulla
                  et efficitur purus, ut faucibus leo. Sed tempus pretium ante
                  lobortis dictum. Nunc lorem nisl, laoreet at placerat in,
                  tincidunt eget nisl.
                </Typography>
                <Grid
                  container
                  direction="row"
                  columnGap={5}
                  alignItems="center"
                >
                  <Grid justifyContent="center">
                    <Typography variant="h4">1</Typography>
                    <Typography>liczba podejsc</Typography>
                  </Grid>
                  <Grid justifyContent="center">
                    <Typography variant="h4">1</Typography>
                    <Typography>liczba zaliczen</Typography>
                  </Grid>
                  <Grid justifyContent="center">
                    <Typography variant="h4">1</Typography>
                    <Typography>sredni wynik</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                disableElevation
                endIcon={<ChevronRight />}
              >
                Zobacz poprzednie wyniki
              </Button>
            </Surface>
          </Box>
        </Box>
      </Grid>
    </NavLayout>
  );
}
