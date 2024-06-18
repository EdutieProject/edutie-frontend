import { AndroidOutlined, MenuBook } from '@mui/icons-material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import DistributedLearningIcon from '../components/customIcons/DistributedLearningIcon';
import EdutieHomeIcon from "../components/customIcons/EdutieHomeIcon";
import ExcerciseNotebookIcon from '../components/customIcons/ExcerciseNotebookIcon';
import UserIcon from '../components/customIcons/UserIcon';
import CoursesCapIcon from '../components/customIcons/CoursesCapIcon';

export const navigationPath = {
    home: "/",
    courses: "/courses",
    lessonTree: "/courses/:courseId",
    segmentTree: "/lessons/:lessonId",
    segment: "/segments/:segmentId",
    exercise: "/segments/:segmentId/exercises/:resourceId",
    account: "/profiles/:id",
    fillPath: (p, ...args) => {
        let counter = 0;
        return p.split("/").map((o, i) => i == 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o).join('');
    }
}

const getIconColor = (active) => active 

//TODO navElements inside navBar or here?
export const navElements = [
    {
      id: 1,
      icon: (color) => <EdutieHomeIcon fontSize='large' color={color}/>,
      href: navigationPath.home,
  
    },
    {
      id: 2,
      icon: (color) => <ExcerciseNotebookIcon fontSize='large' color={color}/>,
      href: navigationPath.fillPath(navigationPath.exercise, "ID-SEGMENT", "ID_LEARNING_RESOURCE"),
    },
    {
      id: 3,
      icon: (color) => <DistributedLearningIcon fontSize='large' color={color}/>,
      href: navigationPath.fillPath(navigationPath.lessonTree, "ID_KURSU")
    },
    {
      id: 4,
      icon: (color) => <CoursesCapIcon fontSize='large' color={color}/>,
      href: navigationPath.fillPath(navigationPath.lessonTree, "ID_KURSU")
    },
    {
      id: 5,
      icon: (color) => <UserIcon fontSize='large' color={color}/>,
      href: navigationPath.fillPath(navigationPath.account, "myself"),
    },
    {
      id: 6,
      icon: (color) => <AndroidOutlined fontSize='large' color={color}/>,
      href: '/playground',
    }
];