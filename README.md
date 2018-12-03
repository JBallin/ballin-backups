# My Sweet Config

*Visualize your dev environment*
<br>
[sweet-config.herokuapp.com][2]

## Description

###### Purpose
I built this as an extension to my Command Line App, [ballin scripts][1], which includes (among other things) a way to automatically backup your developer environment to a gist by simply typing `$ gu` in the command line.

###### Pain
GitHub gists are awesome because they are private and store revision history, but they don't provide a good user experience when you want to look at your files within the gist.

###### Solution
[My Sweet Config][2], named after the pride (sweet) we take in our (my) configs, allows you to view your files by category in a clean interface designed specifically for [ballin scripts][1].

## Tech Stack

###### React Frontend
* React.js (user interface library)
  - Built with [Create React App](https://github.com/facebook/create-react-app)
* React Router
  - Document titles used for navigation history
* Redux (state container)
* Extensive (custom) form validation
* Loading spinners

###### Node Backend
* Node.js
* Express.js (Node.js Web Framework)
* Knex.js (SQL Query Builder)
* PostgreSQL
* Advanced Authentication and Authorization
 - bcrypt (only storing hashed passwords)
 - JSON Web Token (sent as cookies with every request)
 - httpOnly & secure (https) cookies
 - CORS (Restricted API access)
* Extensive error handling
* SuperTest/Mocha/Chai (extensive testing of routes/errors)
* Model-View-Controller design pattern
* ESLint (Airbnb style guide)
  - Also used on frontend, which required [custom configuration][3] to work with Create React App

###### External API's
* GitHub

###### Deployment
* Travis CI (automated testing)
* Heroku
  - Pipelines and review/staging apps
  - Auto-deploy post CI success
  - [Production version][4] of React
  - Proper [React Router configuration][5]
## Usage

```shell
$ yarn install
$ yarn start
```

Note: [API](https://github.com/JBallin/sweet-api) must be running as well.


[2]: https://sweet-config.herokuapp.com
