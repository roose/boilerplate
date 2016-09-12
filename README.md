# boilerplate

CSS/HTML Boilerplate for new project using [PostCSS](https://github.com/postcss/postcss), [PreCSS](https://github.com/jonathantneal/precss)

## Install Dependencies

```
npm i
```

## Folder structure

```
|-- gulpfile.js
|-- package.json
`-- src
    |-- css
    |   |-- base
    |   |   |-- base.css
    |   |   `-- vars.css
    |   |-- main.css
    |   |-- pages
    |   |   `-- home.css
    |   `-- parts
    |       |-- footer.css
    |       |-- header.css
    |       `-- sidebar.css
    |-- img
    |   `-- icons.png
    |-- index.html
    `-- js
        `-- main.js
```

##Gulp commands

```
gulp build
```

Delete `dist` folder, copy all files to `dist` folder, minify images

```
gulp zip
```

Zip all files in `dist` folder to `pkg.name.zip`

```
gulp watch
```

Watch changes and reload browser
