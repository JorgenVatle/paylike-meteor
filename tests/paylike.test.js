import { Tinytest } from 'meteor/tinytest';
import Paylike from "../src/Paylike";

const paylike = new Paylike(Meteor.settings.paylike.secret);

Tinytest.add('Get app', (test) => {
    const identity = paylike.me.identity;
    test.isNotUndefined(identity.id);
    test.isNotUndefined(identity.name);
});