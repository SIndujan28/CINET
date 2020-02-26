# BACKEND-API FOR SOCIAL APP

## Description
This is backend-service API written in NodeJs.The API allows anyone to signup with email and password to be user.Once logged-in,users can edit their profile,update profile picture and create posts.These posts can be viewed by anyone who is following you.Users can follow/unfollow any user anytime they want.Users can also like/unlike and also comment on their friend's posts.The API uses mongodb as database to presists all the user details,post details in document format.

## Requirements
  The core modules used for this developments are
   1. NodeJs
   2. mongoose
   3. express
   4. jsonwebtoken

## Installation
 ### Prerequisites
1.Install Nodejs using this [guide](https://nodejs.org/en/download/).
2.Install [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

  ### Steps to reproduce locally
  1. Clone this repository
```bash
     git clone git@github.com:SIndujan28/CINET.git
```
  2. Run the following command to install all the neccessary modules.
```
     npm install
```
   If you prefer yarn,
```bash
yarn install
```

## Usage
```bash
npm run dev:build
npm run dev
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
