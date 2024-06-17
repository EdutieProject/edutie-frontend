import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import DistributedLearningIcon from '../components/customIcons/DistributedLearningIcon';
import { AndroidOutlined, MenuBook } from '@mui/icons-material';

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

//TODO navElements inside navBar or here?
export const navElements = [
    {
      id: 1,
      icon: <HomeOutlinedIcon fontSize='large' />,
      href: navigationPath.home,
  
    },
    {
      id: 2,
      icon: <MenuBook fontSize='large' />,
      href: navigationPath.fillPath(navigationPath.exercise, "ID-SEGMENT", "ID_LEARNING_RESOURCE"),
    },
    {
      id: 3,
      icon: <DistributedLearningIcon fontSize='large' color='white'/>,
      href: navigationPath.fillPath(navigationPath.lessonTree, "ID_KURSU")
    },
    {
      id: 4,
      icon: <PersonOutlinedIcon fontSize='large' />,
      href: navigationPath.fillPath(navigationPath.account, "myself"),
    },
    {
      id: 5,
      icon: <AndroidOutlined fontSize='large' />,
      href: '/playground',
    }
];