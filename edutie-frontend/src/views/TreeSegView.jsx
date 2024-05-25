import { Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Tree from "../components/Tree.jsx";
import Surface from "../components/global/Surface";

export default function TreeSegView() {
  const theme = useTheme();
  return (
    <NavLayout>
      <Grid container direction="row" spacing={2} marginTop={theme.spacing(4)}>
        <div style={{ width: "100%" }}>
          <Tree />
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              p: 1,
              m: 1,
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              borderRadius: 2,
            }}
          >
            <Surface sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <Typography>Tutaj dolny tekst</Typography>
            </Surface>
          </Box>
        </div>
      </Grid>
    </NavLayout>
  );
}
