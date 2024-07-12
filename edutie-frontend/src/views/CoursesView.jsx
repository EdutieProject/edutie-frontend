import ScienceCarousel from "../components/slider/ScienceCarousel";
import NavLayout from "./layout/NavLayout";
export default function CoursesView() {
  return (
    <NavLayout mode="flex">
      <ScienceCarousel></ScienceCarousel>
    </NavLayout>
  );
}
