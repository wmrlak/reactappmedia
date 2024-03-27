# Introduction

This is a javascript application that exercises React and Redux skills. It uses the following packages:

* [Redux toolkit](https://redux-toolkit.js.org/) for working with Redux. This is a wrapper for Redux.
* [React-Redux](https://react-redux.js.org/) package for bridging the React side with the redux store.
* [json server](https://www.npmjs.com/package/json-server) to persist the data.
* [axios](https://www.npmjs.com/package/axios) package for HTTP requests.
* [Faker-js](https://www.npmjs.com/package/@faker-js/faker) for generating random strings.
* Redux toolkit query for data fetching.

## Set-up

After cloning the github repository, change to the project folder and run:

```bash
npm install
```

### Set-up styling using taiwind css

[Tailwindcss](https://tailwindcss.com/) is a css library that has been used to style the application components (
buttons, drop down menus etc).
[Here](https://tailwindcss.com/docs/installation) are some
set-up instructions when creating a new project.

## Usage

Start the application. This opens a new tab to the browser using the default port for the development server (localhost:3000)

```bash
npm run start
```

Start the Json server:

```bash
npm run start:server
```

### Json server usage

All the data is persisted in db.json file as the user interacts with the application.