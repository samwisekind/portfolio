# Personal Portfolio Website

[![CircleCI](https://circleci.com/gh/Flamov/flamov-portfolio.svg?style=svg)](https://circleci.com/gh/Flamov/flamov-portfolio)
[![codebeat badge](https://codebeat.co/badges/7e311611-c065-47c7-ac47-fd1891aa92b2)](https://codebeat.co/projects/github-com-flamov-flamov-portfolio-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/bbb7d20257647f6ad669/maintainability)](https://codeclimate.com/github/Flamov/flamov-portfolio/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bbb7d20257647f6ad669/test_coverage)](https://codeclimate.com/github/Flamov/flamov-portfolio/test_coverage)
[![Issue Count](https://codeclimate.com/github/Flamov/flamov-portfolio/badges/issue_count.svg)](https://codeclimate.com/github/Flamov/flamov-portfolio)

Source code for my personal web development and design portfolio, located at [https://www.flamov.com](https://www.flamov.com)

Uses Node, Express, Parcel, Pug, and MongoDB. Also uses Mocha, Chai, and Cheerio for testing. Deployed with CircleCI and Docker. [Previously built](https://github.com/Flamov/flamov-portfolio/tree/901d0ad5c6cbc5ee6c6486c7a7c6f463908e6a28) with Lumen and Vue.

1. [Installation](#installation)
2. [Usage](#usage)
    1. [Quick Start](#quick-start)
    2. [Commands](#commands)

## Installation

1. Clone the repository
2. Ensure you are using Node version >= 11 (`nvm install 11` / `nvm use 11`)
3. Install Node modules (`npm i`)
4. Either in the process or in a `.env` file in the root of the repository, pass in the following environment variables:

| Key | Description | Required |
| --- | --- | --- |
| ```NODE_ENV``` | Run the server | True |
| ```NODE_HOST_URL``` | Base URL of the website (without trailing slash) | True |
| ```NODE_MONGODB_URL``` | MongoDB connection string | True |
| ```NODE_MONGODB_REPLICA_SET``` | MongoDB replica set option | False |
| ```NODE_MONGODB_AUTH_SOURCE``` | MongoDB authentication source | False |
| ```NODE_MONGODB_USER``` | MongoDB username | True |
| ```NODE_MONGODB_PASS``` | MongoDB username | True |

## Usage

### Quick Start

* **For development**, use `npm run watch`
* **For testing**, use `npm run test`, `npm run eslint`, and `npm run stylelint`
* **For deployment**, use `npm run assets:build` and then `npm run start`

### Commands

| Command | Description |
| --- | --- |
| ```npm run start``` | Run the server |
| ```npm run watch``` | Watch the server and assets |
| ```npm run server:watch``` | Watch the server with nodemon and restart on changes |
| ```npm run assets:build``` | Build the frontend assets (CSS, JS, etc.) for production |
| ```npm run assets:watch``` | Watch the assets and rebuild on changes with hot-reloading |
| ```npm run eslint``` | Test JavaScript linting with ESLint |
| ```npm run eslint:report``` | Same as ```npm run eslint``` but generates a JUnit report |
| ```npm run stylelint``` | Test SCSS linting |
| ```npm run test``` | Run unit and integration tests |
| ```npm run test:report``` | Same as ```npm run test``` but generates a JUnit report |
| ```npm run test:coverage``` | Same as ```npm run test:report``` but also generates a coverage report |
