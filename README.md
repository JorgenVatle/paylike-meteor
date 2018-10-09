# Paylike Meteor
### A simple Meteor wrapper for Paylike's API enabling synchronous consumption of their payments API.

## Installation
```bash
meteor add jorgenvatle:paylike
```

## Usage

Import package:
```js
import Paylike from 'meteor/jorgenvatle:paylike';

const paylike = new Paylike('your-api-key');
```

#### [Fetch current app](https://github.com/paylike/api-docs#fetch-current-app)
```js
console.log(paylike.me);
```