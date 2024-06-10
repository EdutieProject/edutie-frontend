import { Button, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import { getCourses } from "../services/studyProgramLearningService";
import PointsConnector from "../components/Global/Line";
import Circle from "../components/Global/Circle";
import { useState, useEffect } from "react";

export default function PlaygroundView() {
  const [points, setPoints] = useState([]);
  const [coordinates1, setCoordinates1] = useState(null);
  const [coordinates2, setCoordinates2] = useState(null);

  useEffect(() => {
    const element1 = document.getElementById("jeden");
    const element2 = document.getElementById("dwa");

    if (element1 && element2) {
      const coordinates1 = element1.getBoundingClientRect();
      const coordinates2 = element2.getBoundingClientRect();
      setCoordinates1(coordinates1);
      setCoordinates2(coordinates2);
      setPoints([
        { x: coordinates1?.x ?? 0, y: coordinates1?.y ?? 0 },
        { x: coordinates2?.x ?? 0, y: coordinates2?.y ?? 0 },
      ]);
    }
  }, []);
  if (coordinates1 && coordinates2) {
    console.log(coordinates1, coordinates2);
  }
  return (
    <NavLayout>
      <Typography>
        Hello World! This view is currently occupied for API testing purposes
      </Typography>
      <Button
        onClick={() =>
          getCourses("db48e4f2-e385-4bf4-9e77-9e6939472529").then((o) =>
            console.log(o)
          )
        }
      >
        Fetch
      </Button>
      <div>
        <div id="jeden">
          <Circle size="5vw" />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div id="dwa">
          <Circle size="5vw" />
        </div>
        <PointsConnector points={points} />
      </div>
    </NavLayout>
  );
}
