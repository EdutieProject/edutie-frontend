import { Box, Typography } from "@mui/material";
import React from "react";
import Circle from "../global/Circle.js";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTheme } from "@mui/material";

interface SegmentTreeProps {
    previousElement: any;
    mainElement: any;
    nextElements: Array<any>;
    setMainElement: (newMainElement: any) => void;
}


export default function SegmentTree({ previousElement, mainElement, nextElements, setMainElement }: SegmentTreeProps) {
  const theme = useTheme();
  console.log(previousElement);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "0.8fr 0.1fr 0.8fr 0.1fr 0.8fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `"parent arrow1 this-lesson arrow2 children" `,
      }}
    >
        {
            previousElement === null ? (
                <>
                    <Box
                        sx={{
                            gridArea: "parent",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        justifyContent="center"
                        alignItems="center"
                    ></Box>
                    <Box
                        sx={{
                            gridArea: "arrow1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        justifyContent="center"
                        alignItems="center"
                    ></Box>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            gridArea: "parent",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Circle
                            backgroundColor={previousElement.done === true ? theme.palette.primary.main : theme.palette.grey[200]}
                            size="7vw"
                            onClick={() => setMainElement(previousElement)}
                        >
                            <Typography
                                color={previousElement.done === true ? theme.palette.common.white : theme.palette.primary.main}
                                fontFamily="Baloo"
                                fontSize="4vw"
                            >
                                {previousElement.done === true ? "x" : "?"}
                            </Typography>
                        </Circle>
                        <Typography
                            fontSize="1vw"
                            fontFamily="Baloo"
                            sx={{ marginY: 1 }}
                        >
                            {previousElement.segment.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            gridArea: "arrow1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography>
                            <ArrowForwardIosRoundedIcon
                                sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
                            />
                        </Typography>
                    </Box>
                </>
            )
        }
      <Box
        sx={{
          gridArea: "this-lesson",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Circle
          backgroundColor={mainElement.done === true ? theme.palette.primary.main : theme.palette.grey[200]}
          size="12vw"
        >
          <Typography
            color={mainElement.done === false ? theme.palette.primary.main : theme.palette.common.white}
            fontFamily="Baloo"
            fontSize="7vw"
          >
            {mainElement.done === true ? "x" : "?"}
          </Typography>
        </Circle>
        <Typography
          fontSize="2vw"
          fontFamily="Baloo"
          sx={{ marginY: 1, textAlign: "center" }}
        >
          {mainElement.segment.name}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "arrow2",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          {nextElements.length === 0 ? ("") : (
            <ArrowForwardIosRoundedIcon
              sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
            />
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "children",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2)
        }}
        justifyContent="center"
        alignItems="center"
      >
        {nextElements.map((elem, index) =>
          <Box key={index} sx={{ transform: index === 1 && nextElements.length === 3 ? "translateX(30%)" : "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Circle
              backgroundColor={elem.done === true ? theme.palette.primary.main : theme.palette.grey[200]}
              size="7vw"
              onClick={() => setMainElement(elem)}
            >
              <Typography
                color={elem.done === false ? theme.palette.primary.main : theme.palette.common.white}
                fontFamily="Baloo"
                fontSize="4vw"
              >
                {elem.done === true ? "x" : "?"}
              </Typography>
            </Circle>
            <Typography
              fontSize="1vw"
              fontFamily="Baloo"
              sx={{
                textAlign: "center",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              {elem.segment.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
