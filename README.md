# Trackingplan Cypress
Trackingplan Cypress adds support into Cypress to run Trackingplan as part of your e2e tests. This way, existing tests can be used to catch analytics data problems before they get into production.

## Table of Contents

- [Installing Trackingplan Cypress](#install-trackingplan-cypress)
- [How it works?](#how-it-works)  
- [Advanced options](#advanced-options)
- [Need help?](#need-help)
- [Learn more](#learn-more)

## Installing Trackingplan Cypress

In order to install Trackingplan Cypress, follow the next instructions:

1. Add `@trackingplan/cypress` dependency to `package.json`:

```console
$ # For npm
$ npm install --save-dev @trackingplan/cypress
$
$ # For yarn
$ yarn install --dev @trackingplan/cypress
```

2. Add the `trackingplan` command to Cypress:

    In order to do so, import the `@trackingplan/cypress`. One option is to include the import statement in the `support/command.js` file that can be found in a typical Cypress 12 installation.

    For example:

    
    ```js
    // command.js file
    // Other commands
    import '@trackingplan/cypress';
    ````

 3. Call the new `cv.trackingplan` before each of your tests starts:

    One option is to include a global `beforeEach` in your `support/e2e.js` file.
    
    For example:

    ```js
    beforeEach(() => {
        cy.trackingplan(TP_ID, ENVIRONMENT, TEST_SESSION_ID)
    });
    ```

    Note that in the previous example, `TP_ID`, `ENVIRONMENT` and `TEST_SESSION_ID` must be replaced for actual values:

    - `TP_ID` is the trackingplan identifier for tracks coming from your app.
    - `ENVIRONMENT` allows to isolate the data, e.g. between production and testing environments.
    - `TEST_SESSION_ID` is the identifier of a test session/launch, so that each test launch can be differentiated from previous ones. For example, a timestamp could be used as TEST_SESSION_ID.



## How it works?

Trackingplan Cypress installs interceptors on your app under testing before each test is executed. During tests execution, the analytics data that your app already generates due to user interactions will be collected by Trackingplan Cypress and sent to Trackingplan for further analysis.

Once your tests have finished, you can visit your Trackingplan panel and validate that the analytics performed in each test session match the expected baseline without changing your current tests. See [Regression Testing](https://docs.trackingplan.com/regression-testing) for more details.

<img src="https://user-images.githubusercontent.com/47759/125635223-8298353f-168f-4e31-a881-bc1cb7b21b7e.png" width="400" />


## Need help?
Questions? Problems? Need more info? We can help! Contact us [here](mailto:team@trackingplan.com).


## Learn more
Visit www.trackingplan.com


## License
Copyright © 2022 Trackingplan Inc. All Rights Reserved.