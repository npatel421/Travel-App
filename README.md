# Travel application

This application will give you relavant information on a trip you have planned.
It will provide you with information of weather and show you picture the place you are planning on visiting.

The goal of this project was to have practice with:

 * Set up Webpack
 * Use Webpack Loaders and Plugins
 * Sass styles
 * Create layouts and page design
 * Set up service workers
 * Use APIs and create requests to external APIs

## Motivation

The motivation for doing this project was the opportunity to consolidate what I have learned and putting something together that pulls real life information that someone would be interested in.

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

After cloning, open your terminal and run:

```
npm install
```

>_tip_: **npm i** is shorthand for **npm install**

## Instructions

In order to run this application properly locally you need to signup for a several APIs:
 * [GeoNames](http://www.geonames.org/export/web-services.html)
 * [Weatherbit](https://www.weatherbit.io/account/create)
 * [Pixabay](https://pixabay.com/api/docs/)

Create a new `.env` file in the root of your project. Fill the `.env` file with your keys like this:

```
name=********************
weatherbit_API_KEY=***************
PIXABAY_KEY=************************
```

### Run in development mode

Start the webpack dev server
```
npm build-dev
```

Start the server
```
npm start
```

### Run in production mode

Generate the dist files
```
npm build
```

start the server
```
npm start
```

This will assemble the templates, static assets, Sass, and JavaScript. You can view the test server at this URL:

`http://localhost:8082`

### Run tests

To run the tests, run
```
npm test
```

## Authors

[Nisarg Patel](https://github.com/npatel421)

## Acknowledgments

* [Udacity](https://www.udacity.com/)
* [GeoNames](http://www.geonames.org/export/web-services.html)
* [Weatherbit](https://www.weatherbit.io/account/create)
* [Pixabay](https://pixabay.com/api/docs/)