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

### Usage

```shell
$ yarn install
$ yarn start
```

Note: [API](https://github.com/JBallin/sweet-api) must be running as well.

### Tech Stack
* React.js
* Node.js
* Express.js
* Knex.js
* PostgreSQL
* GitHub API

[2]: https://sweet-config.herokuapp.com
