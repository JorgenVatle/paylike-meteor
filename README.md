# Paylike Meteor
[![CircleCI branch](https://img.shields.io/circleci/project/github/JorgenVatle/paylike-meteor/master.svg)](https://circleci.com/gh/JorgenVatle/paylike-meteor)
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
  "id": "5bbce49ed0dde36a097c3574",
  "name": "Paylike Meteor Test App",
  "created": "2018-10-09T17:26:10.187Z"
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

console.log(myMerchant.name) // "Acme Commerce"
```

#### [Fetch a merchant](https://github.com/paylike/api-docs#fetch-a-merchant)
```js
const myMerchant = paylike.merchants.get('some-merchant-id');
```

#### [Update a merchant](https://github.com/paylike/api-docs#update-a-merchant)
```js
myMerchant.update({
    name: 'Acme Commerce 2',
    email: 'jane@example.com',
    descriptor: 'ACME2',
});

console.log(myMerchant.name) // "Acme Commerce 2"
```

#### [Fetch all merchants](https://github.com/paylike/api-docs#fetch-all-merchants)
```js
const merchants = paylike.merchants.fetch({
    limit: 50,                          // optional - Defaults to 50.
    before: 'merchant-id-goes-here',    // optional - Fetches all merchants before the given id.
    after: 'merchant-id-goes-here',     // optional - Fetches all merchants after the given id.
});
```

### [Merchant's Users](https://github.com/paylike/api-docs#merchants-users)
A merchant can have several users attached. These have complete access to their respective merchant and can add and
remove additional apps and users.

#### [Invite a user](https://github.com/paylike/api-docs#invite-user-to-a-merchant)
```js
const acmeUser = myMerchant.users.invite({ email: 'steven@example.com' });

console.log(acmeUser.id);       // "5bbe8430882cf804f6112d9f"
console.log(acmeUser.isMember); // "true"/"false" - Whether or not the user was a member before creation.
```

#### [Fetch a user](https://github.com/paylike/api-docs#merchants-users)
```js
const acmeUser = myMerchant.users.find('steven@example.com');
```

#### [Remove a user](https://github.com/paylike/api-docs#revoke-user-from-a-merchant)
```js
// You can use:
acmeUser.remove();

// Or:
acmeUser.revoke();

// Or:
acmeUser.delete();
```

#### [Fetch all users](https://github.com/paylike/api-docs#fetch-all-users-on-a-merchant)
```js
myMerchant.users.fetch({
    limit: 50,                      // optional - Defaults to 50.
    before: 'user-id-goes-here',    // optional - Fetches all users before the given id.
    after: 'user-id-goes-here',     // optional - Fetches all users after the given id.
});
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.