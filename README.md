# File upload web app with NodeJS, Express & MongoDB

- Written in NodeJS
- Setup server via Express
- Setup local DB using MongoDB
- Bootstrap is optional for aesthetic purpose

#### Dependencies:
 ```
"dependencies": {
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "mongoose": "^7.2.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```
- bcrypt: A library to help you hash passwords.
- dotenv: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- ejs: Embedded JavaScript templates
- multer: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

#### Dotenv
Create a .env file in the root of your project:

```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```
As early as possible in your application, import and configure dotenv:

```
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working
```
.. or using ES6?

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
```
dotenv.config()
import express from 'express'
```

#### Demo img:
![image](https://github.com/raccoonwannafly/file-upload-nodejs/assets/130273473/4cd0f85f-8265-47b8-919e-db917e5f877a)
![image](https://github.com/raccoonwannafly/file-upload-nodejs/assets/130273473/2e364b25-a243-4add-a66c-a5ed745dc571)


  
  
