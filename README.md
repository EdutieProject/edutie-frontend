
# Frontend Edutie 	
To start an app locally, you need to:

```shell
cd ./edutie-frontend
bun i
bun run dev
```

However, running in the docker container is advised.

# Run inside docker

`docker-compose build` to build image - it makes the image codebase up-to-date.
`docker-compose up` starts the container

Build is required to make after any changes.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## File structure 
 - src/ `source code files & folders. Files placed directly here by convention are configuration & deployment related.`
   - assets/ `folder containing assets e.g. images, svgs, icons, etc. example substructure below`
     - images/
     - svgs/
     - fonts/
   - components/ `folder containing reusable components for further use in views/screens/pages`
     - charts/
     - trees/
     - *further folders named after components kind, **not** after the page uniqueness*
   - features/ `folder containing features, specific for react and application-specific functionalities`
     - redux/ 
   - views/ `folder containing views a.k.a. pages a.k.a. screens.`
     - common/ `subfolder for common code used accross views`
     - FirstView
     - SecondView etc.
   - services/ `folder containing functions for backend interactions`
   - theme/ `folder containing main theme, used for styling across the whole app`

Dependencies flow role model: 
 - Components ⬅️ Assets, Theme
 - Views ⬅️ Assets, Features, Services, Theme
