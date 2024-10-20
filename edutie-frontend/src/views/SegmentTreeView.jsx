import { Typography, Box, Grid, useTheme, Tooltip, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateLearningResource } from "../services/LearningService.js";
import { getSegmentsByLesson } from "../services/studyProgramLearningService.js";
import { saveActiveLessonId } from "../features/storage/activeLessonCache.js";
import { saveActiveSegmentId } from "../features/storage/activeSegmentCache.js";
import { navigationPath } from "../features/navigation.jsx";
import NavLayout from "./layout/NavLayout.jsx";
import Surface from "../components/global/Surface.jsx";
import CircleButton from "../components/global/CircleButton.jsx";
import RoundedButton from "../components/global/RoundedButton.jsx";
import LoadingView from "./common/LoadingView.jsx";
import ErrorView from "./common/ErrorView.jsx";
import SegmentTree from "../components/tree/SegmentTree.jsx";
import InfoCircleIcon from "../components/customIcons/InfoCircleIcon.jsx";

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
  }, [exerciseLoading]);

  // Load initial data
  useEffect(() => {
    saveActiveLessonId(lessonId);
    getSegmentsByLesson(lessonId)
      .then(segmentsResponse => {
        console.log(segmentsResponse);
        allSegments.current = segmentsResponse.data;
        let firstSegment = SegmentSearch.findFirstSegment(segmentsResponse.data);
        setSelectedSegment(firstSegment);
        saveActiveSegmentId(firstSegment.segment.id);
        setError(segmentsResponse.error);
      });
    setSegmentsLoading(false);
  }, [])

  const setSelectedSegmentWithCache = (selectedSegment) => {
    saveActiveSegmentId(selectedSegment.segment.id);
    setSelectedSegment(selectedSegment);
  }

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
    <NavLayout mode="flex" scroll>
      <Box sx={{ flexGrow: 1, display: "flex", felxDirection: "column", justifyContent: "center" }}>
        <SegmentTree previousElement={previousSegment} mainElement={selectedSegment} nextElements={nextSegments} setMainElement={setSelectedSegment} />
      </Box>
      <Box sx={{ display: "flex", px: theme.spacing(2), py: theme.spacing(4) }}>
        <SelectedElementDescriptionTab selectedElement={selectedSegment} setExerciseLoading={setExerciseLoading} />
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
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(2)
      }}>
        <Box sx={{ display: "flex", gap: theme.spacing(4) }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <Typography
              fontFamily="Baloo"
              sx={{ textAlign: "center" }}
              variant="h4"
            >
              {selectedElement.approachesSucceeded >= 0 ? selectedElement.approachesSucceeded : "?"}
              <Tooltip
                title="Zadania zaliczone wzorowo to takie dla których każda z osiągniętych ocen jest równa lub wyższa od 5"
              // sx={{position: "absolute", margin: "auto", transform: "translateY(30%) translateX(30%)"}} 
              >
                <IconButton>
                  <InfoCircleIcon color={theme.palette.secondary.main} height="1.5rem" width="1.5rem" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              ZALICZONE WZOROWO
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: theme.spacing(2), display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton
            label={"Zobacz poprzednie wyniki"}
            active={true}
            disabled
          />
          <CircleButton
            size={theme.spacing(3)}
            onClick={() => setExerciseLoading(true)}
          >
            <Typography fontFamily={"Baloo"} fontSize={36} color={theme.palette.common.white}>{">"}</Typography>
          </CircleButton>
        </Box>
      </Box>
    </Surface >
  );

}

