import { expect } from 'chai';
import Paylike from "../dist/Paylike";

const paylike = new Paylike(Meteor.settings.paylike.secret);

describe('Paylike', function() {
    it('should grab the current app identity', function() {
        expect(paylike.me.identity.id).to.not.be.undefined;
    });
});