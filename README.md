[![build](../../workflows/build/badge.svg)](../../actions?query=workflow%3Abuild)

# Dojo Dashboard

The dashboard accompanies the XP Dojo TDD workshop. It provides an extra element to the workshops where attendees can push changes and see a small build chain kick in and some keys stats reported via the dashboard.


## Starting

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The usual scripts are available, so to start the app, run the following.

    npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Github API Token

To increase the rate limit, authenticate with Github.

Update the `settings.js` with your username and a freshly generated token. Create a token in [Github](https://github.com/settings/tokens).


## Setting up for a Workshop

We have an elaborate forking structure and a special 'delete fork dance' that we have to do to setup for every new workshop.

 * The root Github project is https://github.com/xp-dojo/tdd-bank-account-java
 * The branch `classes` differs in that it includes Github actions and Gradle
 * the fork https://github.com/xp-dojo-classes is where we want workshop attendees to fork

 ### The Delete Form Dance

To setup for a new workshop with a clean fork history.

1. Delete the https://github.com/xp-dojo-classes fork (orphaning any forks)
1. Create a new fork from https://github.com/xp-dojo/tdd-bank-account-java under the `xp-dojo` order and call it `xp-dojo-classes`
1. On the new fork, merge the `classes` branch to `master`
1. Share the instructions below (to have folks fork from the `xp-dojo-classes` fork)


### Instructions for Attendees

TBC


## Playing with Github's API

You can test with curl

    curl https://api.github.com/repos/xp-dojo-classes/tdd-bank-account-java/forks?per_page=1000

or authenticated:

    curl -u username:token https://api.github.com/repos/xp-dojo-classes/tdd-bank-account-java/forks?per_page=1000

