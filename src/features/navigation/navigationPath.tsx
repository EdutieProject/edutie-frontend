export const navigationPath = {
    learnHome: "/",
    createHome: "/create",
    account: "/profiles/:id",
    learningSubjectEditor: "/create/learning-subject/:learningSubjectId",
    learningSubjectLearn: "/learn/learning-subject/:learningSubjectId",
    play: "/play",
    learningExperience: "/learn/learning-experience/:learningExperienceId",
    learningResult: "/learn/learning-result/:learningResultId",
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
