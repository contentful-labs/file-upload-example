# File Upload Example

[![dependencies Status](https://david-dm.org/contentful-labs/file-upload-example/status.svg)](https://david-dm.org/contentful-labs/file-upload-example)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This project is an example to demonstrate our new [direct file upload feature](https://www.contentful.com/blog/2017/03/02/uploading-files-directly-to-contentful/) for the Content-Management-SDK
released at the beginning of March 2017.

## About

[Contentful](https://www.contentful.com) is a content management platform for web applications, mobile apps and connected devices. It allows you to create, edit & manage content in the cloud and publish it anywhere via a powerful API. Contentful offers tools for managing editorial teams and enabling cooperation between organizations.

## Technologies

* [Contentful Management SDK](https://github.com/contentful/contentful-management.js)
* [Preact](https://preactjs.com/)
* [Redux](https://github.com/reactjs/redux) + [Redux Saga](https://github.com/redux-saga/redux-saga)
* [Webpack 2](https://webpack.js.org/)
* [CSS Modules](https://github.com/css-modules/css-modules) via [PostCSS](http://postcss.org/) & [cssnext](http://cssnext.io/)
* [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
* [History API](https://developer.mozilla.org/en/docs/Web/API/History)

## Usage

You can find a ready to use version of this app here:
https://contentful-labs.github.io/file-upload-example/

Alternatively clone this repository, run `npm install` and start a dev server via `npm run dev`


### Development

The minimum supported node version is 4.7.

Via `npm run dev` you can spawn a Webpack dev server with live reload for the app source files and auto restart for changed configuration files.

To test the app in a production environment, build it via `npm run build` and start a production alike server via `npm run prod`.

### Deployment

New versions can simply deployed to GitHub pages via `npm run deploy`. It will run the build process
