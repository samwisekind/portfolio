# Personal Website

[![Build and deploy test](https://github.com/Flamov/portfolio/workflows/Build%20and%20deploy%20test/badge.svg)](https://github.com/Flamov/portfolio/actions?query=workflow%3A%22Build+and+deploy+test%22)

Source code for my personal website located at [https://flamov.com](https://flamov.com).

Uses Node, Express, Parcel, Pug, and MongoDB. Also uses Jest for testing. Deployed with CircleCI and Docker Compose ([compose files can be found here](https://github.com/Flamov/flamov-portfolio-compose)).

![Infrastructure diagram](https://cdn.flamov.com/misc/infrastructure-diagram.png?v5)

See the [next steps and technical roadmap of the project here](https://github.com/users/Flamov/projects/1).

[Previously built](https://github.com/Flamov/flamov-portfolio/tree/901d0ad5c6cbc5ee6c6486c7a7c6f463908e6a28) with Laravel/Lumen, Vue, and MySQL.

## Contents

1. [Installation](#installation)
2. [Usage](#usage)
    1. [Quick Start](#quick-start)
    2. [Commands](#commands)

## Installation

1. Clone the repository
2. Ensure you are using Node version >= 14 (`nvm install 14` / `nvm use 14`)
3. Install Node modules (`npm i`)
4. Either in the process or in a `.env` file in the root of the repository, pass in the following environment variables:

| Key | Description | Required |
| --- | --- | --- |
| ```NODE_ENV``` | Environment name | False |
| ```NODE_HOST_URL``` | Base URL of the website (without trailing slash) | True |
| ```NODE_MONGODB_URL``` | MongoDB connection string | True |
| ```NODE_MONGODB_USER``` | MongoDB username | True |
| ```NODE_MONGODB_PASS``` | MongoDB username | True |
| ```NODE_NEW_RELIC_LICENSE_KEY``` | New Relic license key | True |

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
| ```npm run stylelint``` | Test SCSS linting with stylelint |
| ```npm run test``` | Run unit and integration tests |
| ```npm run test:report``` | Same as ```npm run test``` but generates a JUnit report |
| ```npm run test:coverage``` | Same as ```npm run test:report``` but also generates a coverage report |
