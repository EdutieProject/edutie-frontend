export const navigationPath = {
    home: "/",
    courses: "/courses",
    lessonTree: "/courses/:courseId",
    segmentTree: "/lessons/:lessonId",
    segment: "/segments/:segmentId",
    exercise: "/learning-resource/:resourceId",
    learningResult: "/learning-result/:resultId",
    account: "/profiles/:id",
    creation: "/create/lrd",
    play: "/play",
    /**
     * Fills a navigation path with provided arguments.
     * @param {string} p path to fill
     * @param  {...string} args path params to fill with
     * @returns
     */
    fillPath: (p: String, ...args: Array<String>) => {
        let counter = 0;
        return p
            .split("/")
            .map((o, i) => (i === 0 ? "" : o.startsWith(":") ? "/" + args[counter++] : "/" + o))
            .join("");
    },
};

export const navSections = {
    home: "HOME",
    create: "CREATE",
    you: "YOU"
};
