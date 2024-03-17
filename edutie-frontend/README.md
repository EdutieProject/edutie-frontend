
# Frontend Edutie 	
To start an app, you need to:

Run ApolloSever:
```
cd /edutie-frontend/edutie-frontend
```
``` 
bun index.js
```
Then run react-app:
```
bun i
```

```
bun run dev
```

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
     - redux/  *might be renamed declaratively e.g. "globalstate"*
   - pages/ `folder containing views a.k.a. pages a.k.a. screens.`
     - layout/ `subfolder **only** for layout-related files.`
   - services/ `folder containing functions for backend interactions` *might be renamed e.g. "api"*
   - theme/ `folder containing main theme, used for styling across the whole app`

Dependencies flow role model: 
 - Components ⬅️ Assets, Theme
 - Pages ⬅️ Assets, Features, Services, Theme
