# My Sweet Config

*Visualize your dev environment*

Deployed: [sweet-config.herokuapp.com][2]
<br>
Backend: [sweet-api][7]

## Description

##### Purpose
I built this as an extension to my command line app, [ballin scripts][1], which includes (among other things) a way to automatically backup your developer environment (`.bash_profile`, `brew list`, etc.) to a gist by simply typing `$ gu` in the command line.

##### Pain
GitHub gists are awesome because they are private and store revision history, but they don't provide a good user experience when you want to look at your files within the gist.

##### Solution
[My Sweet Config][2], named after the pride (sweet) we take in our (my) configs, allows you to view your files by category in a clean interface designed specifically for [ballin scripts][1].

## Screen Shots
![login](/screenshots/0_login.png?raw=true "Login")
![signup](/screenshots/1_signup.png?raw=true "Signup")
![app](/screenshots/2_app.png?raw=true "App")
![update username](/screenshots/3_update.png?raw=true "Update Username")
![confirm update](/screenshots/4_update-confirm.png?raw=true "Confirm Update")

## Tech Stack

##### React Frontend
* React.js (user interface library)
  - Built with [Create React App](https://github.com/facebook/create-react-app)
* React Router
  - Document titles used for navigation history
  - static.json file supports visiting links/routes directly
* Redux (state container)
* Extensive (custom) form validation
* Loading spinners
* Bootstrap/reactstrap
* Dynamic navbar based on user being logged in, highlights the page currently on
* Ability to edit/delete profile with custom alert boxes which require password confirmation

##### Node Backend
* Node.js
* Express.js (Node.js Web Framework)
* Knex.js (SQL Query Builder)
* PostgreSQL
* Advanced Authentication and Authorization
  - bcrypt (only storing hashed passwords)
  - JSON Web Token (sent as cookies with every request, only thing stored client-side)
  - httpOnly & secure (https) cookies
  - CORS (Restricted API access)
  - Front-end simulates sessions and refresh tokens by attempting to login using token stored in cookies
* Extensive error handling
* SuperTest/Mocha/Chai (extensive testing of routes/errors)
* Model-View-Controller design pattern
* ESLint (Airbnb style guide)
  - Also used on frontend, which required [custom configuration][3] to work with Create React App

##### External API's
* GitHub

##### Deployment
* Travis CI (automated testing)
* Heroku
  - Pipelines and review/staging apps
  - Auto-deploy post CI success
  - [Production build][4] of React
  - Proper [React Router configuration][5]

## Future Goals
* Social network
  * Friends
  * Likes
  * Granular privacy settings by file (public, friends, private)
  * News feed
  * Notifications
* Discovery/search
  - "What are the most popular VS Code configs?"
* View revision history
* Edit, delete, and add files


## Demo Login
email: `demo@gmail(.com)` password: `hello`

## Usage
```shell
$ yarn install
$ yarn start
```

Note: [API][7] must be running as well.

## Testing
```shell
$ yarn test
```

### Footnotes
All articles linked were written by [me][6].

[1]: https://github.com/JBallin/ballin-scripts
[2]: https://sweet-config.herokuapp.com
[3]: https://hackernoon.com/a-simple-linter-setup-finally-d908877fa09
[4]: https://hackernoon.com/properly-deploy-your-react-app-to-heroku-c1a13f5f978c
[5]: https://medium.com/@PrintSupWorld/how-to-deploy-a-react-router-app-to-heroku-d59e4f194ec8
[6]: https://medium.com/@PrintSupWorld
[7]: https://github.com/JBallin/sweet-api
