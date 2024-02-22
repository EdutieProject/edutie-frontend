import { lessons, trees } from "./db" 

export const resolvers = {
    Query: {
      lesson: (parent, args, context, info) => 
      {
        const {id} = args;
        return lessons.find((a) => a.id == id) 
      },
      lessons: () => lessons,
      trees: () => trees
    },
  };