# Paylike Meteor
![CircleCI branch](https://img.shields.io/circleci/project/github/JorgenVatle/paylike-meteor/master.svg)
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

### [Merchants](https://github.com/paylike/api-docs#merchants)
The Merchant object is responsible for a funding bank account as well as all of it's associated transactions. This is
essentially a shop. It is important to note that all users and apps have complete access to their merchant. This
includes inviting and removing users.

#### [Create a merchant](https://github.com/paylike/api-docs#create-a-merchant)
```js
const myMerchant = paylike.merchants.create({
    name: 'Acme Commerce',
    test: true,
    currency: 'EUR',
    email: 'john@example.com',
    website: 'https://example.com',
    descriptor: 'ACME',
    company: {
        country: 'RO'
    }
});
```

#### [Fetch a merchant](https://github.com/paylike/api-docs#fetch-a-merchant)
```js
const myMerchant = paylike.merchants.get('some-merchant-id');
```

#### [Update a merchant](https://github.com/paylike/api-docs#update-a-merchant)
```js
const myMerchant = paylike.merchants.get('some-merchant-id');

myMerchant.update({
    name: 'Acme Commerce 2',
    email: 'jane@example.com',
    descriptor: 'ACME2',
});
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.