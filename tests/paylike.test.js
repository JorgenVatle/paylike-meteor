import { Meteor } from 'meteor/meteor';
import { expect, assert } from 'chai';
import Paylike from "../dist/Paylike";
import PaylikeGateway from "../dist/Paylike/gateway/gateway";

const testData = JSON.parse(Assets.getText('tests/data.json'));
const paylike = new Paylike(Meteor.settings.paylike.secret);
const gateway = new PaylikeGateway(Meteor.settings.paylike.public);

describe('Paylike', function() {
    it('should grab the current app identity', function() {
        expect(paylike.me.id).to.not.be.undefined;
    });

    it('should fetch a merchant', function() {
        const merchant = paylike.merchants.find(testData.merchant.id);
        expect(merchant.id).to.not.be.undefined;
    });

    it('should update a merchant', function() {
        const merchant = paylike.merchants.find(testData.merchant.update);

        const state1 = merchant.update({ name: 'test-state1' });
        assert.equal(state1.name, 'test-state1');

        const state2 = merchant.update({ name: 'test-state2' });
        assert.equal(state2.name, 'test-state2');
    });

    it('should add a user to a merchant', function() {
        this.timeout(5000);
        const merchant = paylike.merchants.find(testData.merchant.users);
        const email = 'steven@example.com';

        const user = merchant.users.invite({ email });

        expect(user.id).to.not.be.undefined;
        assert.equal(user.email, email);
    });

    it('should revoke a user from a merchant', function() {
        this.timeout(5000);
        const merchant = paylike.merchants.find(testData.merchant.users);
        const email = 'retired@example.com';

        const user = merchant.users.invite({ email });

        expect(user.id).to.not.be.undefined;
        assert.equal(user.email, email);

        expect(() => {
            user.remove();
        }).to.not.throw;
    });

    it('should fetch a list of users', function() {
        const merchant = paylike.merchants.find(testData.merchant.id);
        const users = merchant.users.fetch();

        assert.isAtLeast(users.length, 1);
    });

    it('should fetch a list of apps', function() {
        const merchant = paylike.merchants.find(testData.merchant.id);
        const users = merchant.apps.fetch();

        assert.isAtLeast(users.length, 1);
    });

    it('should fetch a list of merchants', function() {
        const merchants = paylike.merchants.fetch();

        assert.isAtLeast(merchants.length, 1);
    });

    it('should fetch a list of transactions', function() {
        const merchant = paylike.merchants.find(testData.merchant.id);

        assert.isAtLeast(merchant.transactions.fetch().length, 1);
    });
});

describe('Paylike Gateway', function() {

    it('should create a payment', function() {
        const payment = gateway.createPayment({
            currency: "EUR",
            amount: 1337,
            card: testData.card.valid,
        });

        expect(payment.id).to.not.be.undefined;
    });

});