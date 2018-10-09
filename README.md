# Paylike Meteor
### A simple Meteor wrapper for Paylike's API enabling synchronous consumption of their payments API.

## Installation
```bash
meteor add jorgenvatle:paylike
```

## Usage

### Import package
```js
import Paylike from 'meteor/jorgenvatle:paylike';

const paylike = new Paylike('your-api-key');
```

### [Fetch current app](https://github.com/paylike/api-docs#fetch-current-app)
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