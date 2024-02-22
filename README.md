# Trackingplan Cypress
Trackingplan Cypress adds support into Cypress to run Trackingplan as part of your e2e tests. This way, existing tests can be used to catch analytics data problems before they get into production.

## Table of Contents

- [How it works?](#how-it-works)
- [Installing Trackingplan Cypress](#install-trackingplan-cypress)
- [Advanced options](#advanced-options)
- [Known issues](#known-issues)
- [Need help?](#need-help)
- [Learn more](#learn-more)

## How it works?

Trackingplan Cypress installs a network interceptor in your app under testing before each test is executed. During tests execution, the analytics data that your app already generates due to user interactions will be collected by Trackingplan Cypress and sent to Trackingplan for further analysis.

This process works in the background as non-blocking and, therefore, does not interfere with the original request sent to your analytics destination.

Once your tests have finished, you can visit your Trackingplan panel and validate that the analytics performed in each test session match the expected baseline without changing your current tests.

See [Regression Testing](https://docs.trackingplan.com/regression-testing) for more details.

<img src="https://user-images.githubusercontent.com/47759/125635223-8298353f-168f-4e31-a881-bc1cb7b21b7e.png" width="400" />

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

    In order to do so, one option is to import the `@trackingplan/cypress` plugin in your `support/command.js` file. Note that you don't need to copy our custom command, only import the plugin. For example:
    
    ```js
    // command.js file
    // Other commands
    import '@trackingplan/cypress';
    ````

 3. Setup `beforeEach` and `afterEach` for Trackingplan Cypress:

    One option is to include a global `beforeEach` in your `support/e2e.js` file. For example:

    ```js
    beforeEach(() => {
        // Initializes Trackingplan Cypress before each test starts
        cy.trackingplan(TP_ID, ENVIRONMENT, TEST_SESSION_ID, {
            // Advanced options goes here
            tracksEndPoint: "https://eu-tracks.trackingplan.com/v1/"
        })
    });

    afterEach(() => {
        // Ensures collected data is sent after test has finished
        cy.trackingplan_after_each();
    });
    ```

    Note that in the previous example, `TP_ID`, `ENVIRONMENT` and `TEST_SESSION_ID` must be replaced for actual values:

    - `TP_ID` is the trackingplan identifier for tracks coming from your app.
    - `ENVIRONMENT` allows to isolate the data, e.g. between production and testing environments.
    - `TEST_SESSION_ID` is the identifier of a test session/execution, so that each test execution can be differentiated from previous ones. For example, a timestamp or build number could be used as TEST_SESSION_ID.
    - `tracksEndPoint` is the endpoint where collected analytics data are sent. In the example above, it has been set to point to the tracking endpoint in Europe. See [Advanced options](#advanced-options).


### Advanced options

The `cy.trackingplan` command can receive an optional `options` object as the last parameter.


| Parameter | Description | Default value | Example |
|-|-|-|-|
| `customDomains` | Allows to extend the list of monitored domains. Any request made to these domains will also be forwarded to Trackingplan. The format is `{"myAnalyticsDomain.com": "myAnalytics"}`, where you put, respectively, the domain to be looked for and the alias you want to use for that analytics domain. | `{}`            | `{"mixpanel.com": "Mixpanel"}` |
| `sourceAlias`   | Allows to differentiate between sources | `cypress` | `IOS App` |
| `tracksEndPoint` | Endpoint where collected analytics data are sent.
| `debug`         | Shows Trackingplan debugging information in the console | `false` | `true` |


## Known issues
- `cy.intercept` command doesn't work as expected when `fetch` interceptor is enabled in Trackinglan Cypress. This interceptor is disabled by default.

## Need help?
Questions? Problems? Need more info? We can help! Contact us [here](mailto:team@trackingplan.com).


## Learn more
Visit www.trackingplan.com


## License
Copyright © 2022 Trackingplan Inc. All Rights Reserved.