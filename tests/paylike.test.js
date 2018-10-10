import { Meteor } from 'meteor/meteor';
import { expect, assert } from 'chai';
import Paylike from "../dist/Paylike";

const testData = JSON.parse(Assets.getText('tests/data.json'));
const paylike = new Paylike(Meteor.settings.paylike.secret);

describe('Paylike', function() {
    it('should grab the current app identity', function() {
        expect(paylike.me.identity.id).to.not.be.undefined;
    });

    it('should fetch a merchant', function() {
        const merchant = paylike.merchants.get(testData.merchant.id);
        expect(merchant.id).to.not.be.undefined;
    });

    it('should update a merchant', function() {
        const merchant = paylike.merchants.get(testData.merchant.update);

        const state1 = merchant.update({ name: 'test-state1' });
        assert.equal(state1.name, 'test-state1');

        const state2 = merchant.update({ name: 'test-state2' });
        assert.equal(state2.name, 'test-state2');
    });
});