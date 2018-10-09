import { Tinytest } from 'meteor/tinytest';
import Paylike from "../dist/Paylike";

const paylike = new Paylike(Meteor.settings.paylike.secret);

Tinytest.add('Get app', (test) => {
    test.isNotUndefined(paylike.me.identity);
});