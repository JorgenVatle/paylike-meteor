# Paylike Meteor
[![CircleCI branch](https://img.shields.io/circleci/project/github/JorgenVatle/paylike-meteor/master.svg)](https://circleci.com/gh/JorgenVatle/paylike-meteor)
[![Atmosphere](https://img.shields.io/badge/atmosphere-jorgenvatle%3Apaylike-blue.svg)](https://atmospherejs.com/jorgenvatle/paylike)

A full-fledged Meteor wrapper for [Paylike](https://paylike.io/)'s API enabling synchronous consumption of their payments API.

## Installation
```bash
meteor add jorgenvatle:paylike
```

## Usage

### Import package
The following examples will use the `paylike` constant defined below.
```js
import Paylike from 'meteor/jorgenvatle:paylike';

// API Key optional if you've already got yours defined in your Meteor settings.
const paylike = new Paylike('your-api-key');
```
To not have to pass your API key in with every new instance of Paylike, use the following settings format for your
[Meteor settings](https://docs.meteor.com/api/core.html#Meteor-settings):
```json
{
  "paylike": {
    "private": "paylike-api-key"
  }
}
```

### [Apps](https://github.com/paylike/api-docs#fetch-current-app)
An app belongs to a merchant and is used to perform actions on the attached merchant. Your API key is regarded as an
app.

#### [Current app](https://github.com/paylike/api-docs#fetch-current-app)
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

#### [Create app](https://github.com/paylike/api-docs#fetch-current-app)
This adds an app to the merchant your current API key (app) belongs to.
```js
const newApp = paylike.apps.create({
    name: 'my-new-app' // Optional
});
```

### [Merchants](https://github.com/paylike/api-docs#merchants)
The Merchant object is responsible for a funding bank account as well as all of it's associated transactions. This is
essentially a shop. It is important to note that all users and apps have complete access to their merchant. This
includes inviting and removing users.

#### [Current merchant](https://github.com/paylike/api-docs#fetch-all-merchants)
```js
const merchant = paylike.merchant;

console.log(merchant.name) // "My Online Shop"
```

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
const myMerchant = paylike.merchants.find('some-merchant-id');
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

### [Transactions](https://github.com/paylike/api-docs#transactions)
A transaction, or reservation, defines an amount of funds authorized for captures, refunds and voids.

#### [Create a transaction](https://github.com/paylike/api-docs#create-a-transaction)
```js
const details = {
    currency: 'EUR',            // required - Currency
    amount: 1337,               // required - Amount of funds to reserve.
    descriptor: 'test-payment', // optional - Descriptor to show up on bank statement 
};

// Use the card associated with a previous transaction:
const transaction = myMerchant.transactions.create({
    transactionId: 'id-of-a-previous-transaction',  // required - Needs to be a valid transaction ID.
    ...details,
});

// ... Or use a saved card:
const cardTransaction = myMerchant.transactions.create({
    cardId: 'card-id-goes-here',
    ...details,
});
```

#### [Fetch a transaction](https://github.com/paylike/api-docs#fetch-a-transaction)
```js
const transaction = myMerchant.transactions.find('transaction-id-goes-here');
```

#### [Capture a transaction](https://github.com/paylike/api-docs#capture-a-transaction)
```js
transaction.capture({
    amount: 1337, // optional - Amount to capture. (defaults to reserved amount) 
});
```

#### [Void a transaction](https://github.com/paylike/api-docs#void-a-transaction)
```js
transaction.void({
    amount: 1337, // optional - Amount to void. (defaults to reserved amount) 
});
```

#### [Refund a transaction](https://github.com/paylike/api-docs#refund-a-transaction)
```js
transaction.refund({
    amount: 1337, // optional - Amount to refund. (defaults to captured amount)
});
```

### [Cards](https://github.com/paylike/api-docs#cards)
Cards saved using the [Web SDK](https://github.com/paylike/sdk) are already in your vault and doesn't need to be saved
on the backend.

#### [Save a card using a transaction](https://github.com/paylike/api-docs#save-a-card)
```js
const card = myMerchant.cards.save({
    transactionId: 'id-of-a-previous-transaction',  // required - Needs to be a valid transaction ID.
    notes: 'Some notes about this card',            // optional
});
```

#### [Fetch a card](https://github.com/paylike/api-docs#fetch-a-card)
```js
const card = myMerchant.cards.find('card-id-goes-here');
```

#### [Create a transaction from card](https://github.com/paylike/api-docs#create-a-transaction)
```js
const transaction = card.reserve({
    currency: 'EUR',            // required - Currency
    amount: 1337,               // required - Amount of funds to reserve.
    descriptor: 'test-payment', // optional - Descriptor to show up on bank statement 
});
```

### [Fraud alerts](https://github.com/paylike/api-docs#fraud-alerts)

#### [Fetch all fraud alerts](https://github.com/paylike/api-docs#search-fraud-alerts)
```js
const alerts = myMerchant.fraudAlerts.fetch({
    limit: 50,                      // optional - limit the alert count. (defaults to 50)
    before: 'alert-id-goes-here',   // optional - Fetches all users before the given id.
    after: 'alert-id-goes-here',    // optional - Fetches all users after the given id.
    filter: {
        transactionId: 'some-id'    // optional - Fetch alerts only for the given transaction.
    }
});
```

#### [Fetch an alert](https://github.com/paylike/api-docs#fetch-a-fraud-alert)
```js
const alert = myMerchant.fraudAlerts.find('alert-id-goes-here');
```

## Contributing
Pull requests are more than welcome! When adding new features, going through the effort to include tests for them is
greatly appreciated.

#### Starting the development environment
1. Add your Paylike credentials to `settings.json` (See `settings.example.json` for an example)
2. Use `npm install` to install dependencies.
3. Use `npm start` to start _both_ the TypeScript build watcher and the test watcher.

#### Alternatively, start watchers individually
Use `npm test` to start _just_ the test watcher.

Use `npm run build -- --watch` to start _just_ the TypeScript build watcher.


## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.