# Paylike Meteor
[![Atmosphere](https://img.shields.io/badge/atmosphere-jorgenvatle%3Apaylike-blue.svg)](https://atmospherejs.com/jorgenvatle/paylike)

A simple Meteor wrapper for [Paylike](https://paylike.io/)'s API enabling synchronous consumption of their payments API.

## Installation
```bash
meteor add jorgenvatle:paylike
```

## Usage

### Import package
The following examples will use the `paylike` constant defined below.
```js
import Paylike from 'meteor/jorgenvatle:paylike';

const paylike = new Paylike('your-api-key');
```

### [Current app](https://github.com/paylike/api-docs#fetch-current-app)
You can access your current app identity at any time through `paylike.me`.
```js
console.log(paylike.me);
```
Example output:
```json
{
  "identity": {
    "id": "5bbce49ed0dde36a097c3574",
    "name": "Paylike Meteor Test App",
    "created": "2018-10-09T17:26:10.187Z"
  }
}
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.