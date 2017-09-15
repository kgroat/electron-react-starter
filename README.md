
# Electron starer app

### Getting started
1. Insatll [node.js](https://nodejs.org/en/download/)
1. Clone repository
1. Run `npm install` in the repository root directory

### Running the app
#### Running the app in development mode:
Run `npm start` in the repository root directory.

This will automatically compile and bundle the application and open Electron pointing at the bundle.

#### Building the app for production:
Run `npm run build` in the repository root directory.

This will generate distributions for MacOS, Windows x86, and Windows x64.  Steps include bundling the code, downloading the binaries for each platform, renaming the application objects, and moving the outputs to the necessary application directory for each platform.

All of the application outputs will be generated into their own subdirectory of the `output` directory. Some application information is pulled from `package.json`, namely the app name is pulled from `appName`, and the version is pulled from `version`.

### Development
To run linting and tests, run `npm test` in the repository root directory.

To run only linting or tests, the command would instead be `npm run test:lint` or `npm run test:unit` respectively.
