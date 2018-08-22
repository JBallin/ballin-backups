# My Sweet Config
**Visualize your computer's environment!**

Q3 React Project at Galvanize's Web Development Immersive.

### Tech Stack
* React.js
* Node.js
* Express.js ([API](https://github.com/JBallin/sweet-api))
* Knex.js
* PostgreSQL
* GitHub API

### Screenshot

![Screenshot](public/images/expanded_category.png 'Screenshot')

### Local Installation
```shell
$ git clone https://github.com/JBallin/sweet-config.git
$ git clone https://github.com/JBallin/sweet-api.git
$ createdb sweet_dev && createdb sweet_test
$ cd sweet-config && yarn install && yarn start
# open separate terminal tab/window for API
$ cd ../sweet-api && npm i
$ echo "GIST_ID=$YOUR_GIST_ID" > .env
$ npm run seed-dev && npm run dev
# visit localhost:3000 for the front-end and localhost:8082 for the back-end API
```
