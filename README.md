boilerplate
===========

CSS/HTML Boilerplate for new project

## Install Dependencies

```
npm install
```

## Folder structure

```
|--src              --> source folder
|  |--css           --> styles
|  |--img           --> images
|  |--js            --> javascripts
|  |  |--libs       --> js libs, jquery etc
|  |--index.html    --> base layout file
|--gulpfile.js      --> gulp tasks
|--package.json     --> gulp config
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
