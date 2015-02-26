boilerplate
===========

CSS/HTML Boilerplate for new project

## Install Dependencies

```
npm install
```

## Folder structure

```
├───css             --> styles
├───dist            --> production folder
├───images          --> images
├───js              --> javascripts
│   └───libs        --> js libs, jquery etc
├───node_modules    --> node modules
│
├───gulpfile.js     --> gulp tasks
├───index.html      --> base layout file
└───package.json    --> gulp config
```

##Gulp commands

```
gulp build
```

Delete `dist` folder, copy all files to `dist` folder, minify images

```
gulp zip
```

Zip all files in `dist` folder to `archive.zip`

```
gulp watch
```

Watch changes, minify, concat css, minify js and reload browser
