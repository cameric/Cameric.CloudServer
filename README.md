## Cameric.CloudServer ##

  The back-end services based on LeanCloud BaaS API

## Local Installation ##

  Clone repository to local directory and run

```Bash
$ npm install
```
  This will install all necessary Node dependencies to your repository

  Check that you have installed LeanCloud command-line tool. If not, please follow this guide to install the CLI

  Once the CLI is successfully installed, you can run:

```Bash
$ avoscloud
```
  to start the server locally

> Note that LeanCloud CLI contains a nodemon module.
> So everytime you modify the code, you don't need to manually stop the server and restart it again.
> The server will restart automatically.

## Usage ##

  All cloud functions should be called using the standard API. The curl command looks like:

```Bash
curl -X POST -H "Content-Type: application/json; charset=utf-8" \
    -H "X-LC-Id: lAeVhtmnzDG3lEVKI8fV7F9c" \
    -H "X-LC-Key: qWKHBug84HMSqXrR5DXjBQsO" \
    -H "X-LC-Prod: 0" \
    -d '{}' \
https://leancloud.cn/1.1/functions/updateFilters
```

1.  Three headers about the app info must be included
2.  Data should be packed using JSON/JSONP and the format for each API is provided below
3.  The URL should always be in the format of https://leancloud.cn/1.1/functions/{FunctionName}

## APIs ##
*Note for future development:* Keeping docs in the readme is cumbersome. In the
future, please use [JSDoc](usejsdoc.org) to document your functions directly in
the source files; you can then automatically generate documentation on the
command line. See my `models/appointments.js` for an example.
- Spencer

### Search API ###

#### `updateFilters` ####

-   <em> Description: </em>

    retrive the newest list of filters used for the search bar

-   <em> Input: </em>

    (None) no input query needed

-   <em> Return: </em>

    (Object) an formatted object is returned. The format will always look like:

```js
{
    "keys": [...]       // A list of keys of the "filters" field
    "filters": {...}    // An object of all filters in key-value pairs
}
```

####  `getUsersByFilter` ####

-   <em> Description: </em>

    get a list of user infos according to the provided filters

-   <em> Input: </em>

    (Object) an object of filters in key-value pair

> Do NOT include filters that are not in the "keys" field of the return value of updateFilters

  Example filters looks like:

```js
{
    "category": ["开发", "律师"]
    "score": 20
}
```

-   <em> Return: </em>

    (Array) an array of all the matched users

> In the current version the entire user info will be returned.
> This might be changed later after more discussion.

#### `getUsersByKeyword (NOT FINISHED!)` ####

-   Description:

    get a list of user infos according to an input query string

> This function is finished, but not activated because according to the documentation,
> searching directly from the client-side includes more flexibility and constraints,
> which is more preferable in our case.

### User API ###

#### `getUserShortById` ####

-   Description:

    get the truncated user info according to an UID

-   Input:

    (String) the target UID

-   Return:

    (Object) the shortened version of user info including only necessary information

    Currently the list of information contains:
    +   name
    +   username
    +   category'
    +    score
    +    avatar (name, link and timestamp, etc)

> Subject to change

### Appointment API ###
Converted to JSDoc.
