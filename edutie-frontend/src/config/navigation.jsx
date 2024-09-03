import { AndroidOutlined } from "@mui/icons-material";
import DistributedLearningIcon from "../components/customIcons/DistributedLearningIcon";
import EdutieHomeIcon from "../components/customIcons/EdutieHomeIcon";
import ExcerciseNotebookIcon from "../components/customIcons/ExcerciseNotebookIcon";
import UserIcon from "../components/customIcons/UserIcon";
import CoursesCapIcon from "../components/customIcons/CoursesCapIcon";

export const navigationPath = {
  home: "/",
  courses: "/courses",
  lessonTree: "/courses/:courseId",
  segmentTree: "/lessons/:lessonId",
  segment: "/segments/:segmentId",
  exercise: "/segments/:segmentId/exercises/:resourceId",
  account: "/profiles/:id",
  creation: "/creation/lrd",
  fillPath: (p, ...args) => {
    let counter = 0;
    return p
      .split("/")
      .map((o, i) =>
        i == 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o
      )
      .join("");
  },
};

const iconSize = "2.25rem";

//TODO navElements inside navBar or here?
export const navElements = [
  {
    id: 1,
    icon: (color) => (
      <EdutieHomeIcon color={color} height={iconSize} width={iconSize} />
    ),
    href: navigationPath.home,
  },
  {
    id: 2,
    icon: (color) => (
      <ExcerciseNotebookIcon color={color} height={iconSize} width={iconSize} />
    ),
    href: navigationPath.fillPath(
      navigationPath.exercise,
      "ID-SEGMENT",
      "ID_LEARNING_RESOURCE"
    ),
  },
  {
    id: 3,
    icon: (color) => (
      <DistributedLearningIcon
        color={color}
        height={iconSize}
        width={iconSize}
      />
    ),
    href: navigationPath.fillPath(navigationPath.lessonTree, "ID_KURSU"),
  },
  {
    id: 4,
    icon: (color) => (
      <CoursesCapIcon color={color} height={iconSize} width={iconSize} />
    ),
    href: navigationPath.courses,
  },
  {
    id: 5,
    icon: (color) => (
      <UserIcon color={color} height={iconSize} width={iconSize} />
    ),
    href: navigationPath.fillPath(navigationPath.account, "myself"),
  },
];
