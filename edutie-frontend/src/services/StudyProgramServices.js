import { allCourses, allSciences } from "./MockDb"

export function getAllSciences() {
    return allSciences;
}

export function getCoursesOfScience(scienceId) {
    return allCourses.filter(o => o.science.id === scienceId);
}

export function getCourseById(courseId) {
    return allCourses.find(o => o.id === courseId);
}