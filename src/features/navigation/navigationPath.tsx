export const navigationPath = {
    home: "/",
    account: "/profiles/:id",
    create: "/create",
    learningSubjectEditor: "/create/learning-subject/:learningSubjectId",
    learningSubjectLearn: "/learn/learning-subject/:learningSubjectId",
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
