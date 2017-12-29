Run npm install (this will install dependencies from package.json)
Or run install individually, e.g:
npm install -g watchify
see https://github.com/browserify/watchify
npm install --save-dev babelify
...

Note in package.json 
..."main" is configured as:
{
  "name": "ETH Sender App",
  "version": "1.0.0",
  "description": "ETH Sender App - interacting-with-the-blockchain",
  "main": "../src/dapp.js",
...
..."start" is configured as:
  "scripts": {
    "start": "watchify src/dapp.js -o www/bundle.js -v"
  },

Run testrpc -p 8700
From project root directory, run npm start
From web browser, open www/index.html