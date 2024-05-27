export const navigationPath = {
    home: "/",
    courses: "/courses",
    learningTree: "/courses/:courseId",
    segment: "/segments/:segmentId",
    exercise: "/segments/:segmentId/exercises/:resourceId",
    account: "TODO!",
    fillPath: (p, ...args) => {
        let counter = 0;
        return p.split("/").map((o, i) => i == 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o).join('');
    }
}