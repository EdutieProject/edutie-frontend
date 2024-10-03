import NavLayout from "./layout/NavLayout";
import Circle from "../components/global/Circle";
import RoundedButton from "../components/global/RoundedButton.jsx";
import { Grid, IconButton, Typography, useTheme, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
export default function SegmentTreeEditorView() {
  const theme = useTheme();
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
                variant="h4"
                fontFamily={"Baloo"}
                sx={{
                  marginBottom: theme.spacing(2),
                }}>
                Nazwa wybranego seg
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
                sx={{
                  marginBottom: theme.spacing(6),
                }}>
                Opis wybranego segmentu normalne slowa jakies tam bla bla dluzsze wlazl kotek na plotek Opis wybranego
                segmentu normalne slowa jakies tam bla bla dluzsze wlazl kotek na plotek Opis wybranego segmentu
                normalne slowa jakies tam bla bla dluzsze
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
