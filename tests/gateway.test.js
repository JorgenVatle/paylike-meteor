import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import PaylikeGateway from "../dist/Paylike/gateway/gateway";

const testData = JSON.parse(Assets.getText('tests/data.json'));
const gateway = new PaylikeGateway(Meteor.settings.paylike.public);

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