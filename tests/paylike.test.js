import { Meteor } from 'meteor/meteor';
import { expect, assert } from 'chai';
import Paylike, { PaylikeGateway } from "../dist";

const testData = JSON.parse(Assets.getText('tests/data.json'));
const paylike = new Paylike(Meteor.settings.paylike.secret);
const gateway = new PaylikeGateway(Meteor.settings.paylike.public);

describe('Paylike', function() {
    const merchant = paylike.merchants.current;
    this.timeout(5000);

    it('should grab the current app identity', function() {
        expect(paylike.me.id).to.not.be.undefined;
    });

    it('should fetch a merchant', function() {
        expect(merchant.id).to.not.be.undefined;
    });

    it('should fetch a list of users', function() {
        assert.isAtLeast(merchant.users.fetch().length, 1);
    });

    it('should fetch a list of apps', function() {
        assert.isAtLeast(merchant.apps.fetch().length, 1);
    });

    it('should fetch a list of merchants', function() {
        assert.isAtLeast(paylike.merchants.fetch().length, 1);
    });

    it('should fetch a list of transactions', function() {
        assert.isAtLeast(merchant.transactions.fetch().length, 1);
    });

    it('should fetch a list of fraud alerts', function() {
        expect(() => {
            merchant.fraudAlerts.fetch()
        }).to.not.throw('Paylike');
    });

    it('should update a merchant', function() {
        const state1 = merchant.update({ name: 'test-state1' });
        assert.equal(state1.name, 'test-state1');

        const state2 = merchant.update({ name: 'test-state2' });
        assert.equal(state2.name, 'test-state2');
    });

    it('should add a user to a merchant', function() {
        const email = 'steven@example.com';
        const user = merchant.users.invite({ email });

        expect(user.id).to.not.be.undefined;
        assert.equal(user.email, email);
    });

    it('should revoke a user from a merchant', function() {
        const email = 'retired@example.com';
        const user = merchant.users.invite({ email });

        expect(user.id).to.not.be.undefined;
        assert.equal(user.email, email);

        expect(() => {
            user.remove();
        }).to.not.throw;
    });

    it('should capture a transaction', function() {
        const payment = gateway.createPayment({
            currency: "EUR",
            amount: 1337,
            card: testData.card.valid,
        });
        const transaction = merchant.transactions.find(payment.id);
        transaction.capture({ amount: 1337 });

        assert.equal(transaction.capturedAmount, 1337);
    });

    it('should void a transaction', function() {
        const payment = gateway.createPayment({
            currency: "EUR",
            amount: 1337,
            card: testData.card.valid,
        });
        const transaction = merchant.transactions.find(payment.id);

        transaction.void({ amount: 1337 });

        assert.equal(transaction.voidedAmount, 1337);
    });

    it('should refund a transaction', function() {
        const payment = gateway.createPayment({
            currency: "USD",
            amount: 1337,
            card: testData.card.valid,
        });
        const transaction = merchant.transactions.find(payment.id);

        transaction.capture();
        transaction.refund({ amount: 1337 });

        assert.equal(transaction.refundedAmount, 1337);
    });

    it('should store a card from a transaction', function() {
        const payment = gateway.createPayment({
            currency: "USD",
            amount: 1337,
            card: testData.card.valid,
        });
        const transaction = merchant.transactions.find(payment.id);
        merchant.cards.save({
            transactionId: transaction.id,
            notes: 'paylike.test.js'
        })
    })
});

describe('Paylike Gateway', function() {
    this.timeout(5000);

    it('should create a payment', function() {
        const payment = gateway.createPayment({
            currency: "EUR",
            amount: 1337,
            card: testData.card.valid,
        });

        expect(payment.id).to.not.be.undefined;
    });

    it('should tokenize a card', function() {
        const card = gateway.tokenizeCard(testData.card.valid);

        expect(card.id).to.not.be.undefined;
    });

    it('should throw an exception when you attempt to tokenize an invalid card', function() {
        expect(() => {
            gateway.tokenizeCard(testData.card.invalid);
        }).to.throw('Paylike Gateway');
    });

    it('should throw an exception when you create a payment with an invalid card', function() {
        expect(() => {
            gateway.createPayment({
                currency: "EUR",
                amount: 1337,
                card: testData.card.invalid,
            });
        }).to.throw('Paylike Gateway');
    });

});