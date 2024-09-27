import { Typography, Box, Grid, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout.jsx";
import Surface from "../components/global/Surface.jsx";
import { useEffect, useRef, useState } from "react";
import CircleButton from "../components/global/CircleButton.jsx";
import RoundedButton from "../components/global/RoundedButton.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { navigationPath } from "../features/navigation.jsx";
import LoadingView from "./common/LoadingView.jsx";
import { generateLearningResource } from "../services/LearningService.js";
import ErrorView from "./common/ErrorView.jsx";
import { getSegments } from "../services/studyProgramLearningService.js";
import SegmentTree from "../components/tree/SegmentTree.jsx";

class SegmentSearch {
  /**
   * @param {Array} segments segment array
   * @returns {Object} first segment
   */
  static findFirstSegment(segments) {
    return segments.find(o => o.segment.previousElement === null) ?? null;
  }

  /**
   * @param {Array} allSegments all segments
   * @param {Object} selectedSegment main segment (the selected one)
   * @returns {Object | null} previous segment
   */
  static findPreviousSegment(allSegments, selectedSegment) {
    if (selectedSegment.segment.previousElement === null)
      return null;
    return allSegments.find(o => o.segment.id === selectedSegment.segment.previousElement.id);
  }

  /**
   * @param {Array} allSegments all segments
   * @param {Object} selectedSegment main segment (the selected one)
   * @returns {Array} array of segments
   */
  static findNextSegments(allSegments, selectedSegment) {
    return selectedSegment.segment.nextElements.map(o => allSegments.find(x => x.segment.id === o.id));
  }
}

export default function SegmentTreeView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [segmentsLoading, setSegmentsLoading] = useState(true);
  const [error, setError] = useState(null);
  const allSegments = useRef([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [exerciseLoading, setExerciseLoading] = useState(false);

  // exercise creation effect
  useEffect(() => {
    if (exerciseLoading === false)
      return;
    generateLearningResource(selectedSegment.segment.learningResourceDefinitionId)
      .then((learningResourceResponse => {
        if (learningResourceResponse.success === false) {
          setError(learningResourceResponse.error);
          setExerciseLoading(false);
          return;
        }
        console.log(learningResourceResponse);
        navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), { state: learningResourceResponse.data });
      }));
  }, [exerciseLoading])

  // Load initial data
  useEffect(() => {
    getSegments(lessonId)
      .then(segmentsResponse => {
        console.log(segmentsResponse);
        allSegments.current = segmentsResponse.data;
        setSelectedSegment(SegmentSearch.findFirstSegment(segmentsResponse.data));
        setError(segmentsResponse.error);
      });
    setSegmentsLoading(false);
  }, [])

  if (error !== null) {
    return <ErrorView error={error} />
  }

  if (exerciseLoading || segmentsLoading || selectedSegment == null) {
    return <LoadingView />
  }


  // console.log(selectedSegment);
  let previousSegment = SegmentSearch.findPreviousSegment(allSegments.current, selectedSegment);
  // console.log(previousSegment);
  let nextSegments = SegmentSearch.findNextSegments(allSegments.current, selectedSegment);
  // console.log(nextSegments);

  return (
    <NavLayout mode="flex">
      <Box sx={{ flexGrow: 1, display: "grid", gridTemplateRows: "repeat(3, 1fr)", gridTemplateAreas: `"tree" "tree" "footer"` }}>
        <Box sx={{ gridArea: "tree", display: "flex" }}>
          <SegmentTree previousElement={previousSegment} mainElement={selectedSegment} nextElements={nextSegments} setMainElement={setSelectedSegment} />
        </Box>
        <Box sx={{ gridArea: "footer", display: "flex", px: theme.spacing(2), py: theme.spacing(4) }}>
          <SelectedElementDescriptionTab selectedElement={selectedSegment} setExerciseLoading={setExerciseLoading} />
        </Box>
      </Box>
    </NavLayout>
  );
}

/**
 * 
 * @param {Object} params 
 * @param {Object} params.selectedElement slected segment
 * @param {Object} params.setExerciseLoading function to set exercise loading, invoking LR creation and causing the loading screen to appear. 
 * @returns JSX component
 */
function SelectedElementDescriptionTab({ selectedElement, setExerciseLoading }) {
  const theme = useTheme();
  return (
    <Surface sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Box>
        <Typography fontFamily="Baloo" variant="h4">
          {selectedElement.segment.name}
        </Typography>
        <Typography>{selectedElement.segment.snippetDescription}</Typography>
      </Box>
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
            {selectedElement.approachesTaken >= 0 ? selectedElement.approachesTaken : "?"}
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
            {selectedElement.approachesSucceeded >= 0 ? selectedElement.approachesSucceeded : "?"}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            ZALICZONE WZOROWO
          </Typography>
        </Grid>
        <Grid item xs={2} />
        {/* <Typography
              fontFamily="Baloo"
              sx={{ textAlign: "center" }}
              variant="h4"
            >
              74%
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              ŚREDNI WYNIK
            </Typography>
          </Grid> */}
        <Grid item>
          <RoundedButton
            label={"Zobacz poprzednie wyniki"}
            active={true}
            disabled
          />
        </Grid>
        <Grid item>
          <CircleButton
            size={theme.spacing(3)}
            onClick={() => setExerciseLoading(true)}
          >
            <Typography fontFamily={"Baloo"} fontSize={36} color={theme.palette.common.white}>{">"}</Typography>
          </CircleButton>
        </Grid>
      </Grid>
    </Surface>
  );

}

