import { Meteor } from 'meteor/meteor';
import { HTTP } from "meteor/http";
import { HttpMethod } from "../api/service";
import Helpers from "../helpers";

const settings = Meteor.settings.paylike || {};

export default class PaylikeGateway {

    /**
     * API credentials
     */
    private api: {
        publicKey: string,
        url: string,
    };

    /**
     * Paylike Gateway constructor.
     *
     * @param publicKey
     * @param url
     */
    public constructor(
        publicKey: string = settings.public,
        url: string = settings.gatewayUrl || 'https://gateway.paylike.io'
    ) {
        this.api = { publicKey, url }
    }

    /**
     * Build new exception.
     *
     * @param message
     * @param metadata
     */
    protected exception(message: string, metadata: any) {
        return new Meteor.Error('Paylike Gateway', message, metadata);
    }

    /**
     * Build a URL to the given endpoint.
     *
     * @param endpoint
     */
    protected buildUrl(endpoint: string) {
        return Helpers.buildUri(this.api.url, endpoint);
    }

    /**
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param data
     * @returns {object}
     */
    protected request(method: HttpMethod, path: string, data?: any): any {
        try {
            return HTTP.call(method, this.buildUrl(path), {
                headers: {
                    Accept: 'application/json',
                    'User-Agent': Helpers.userAgent,
                },
                params: {
                    key: this.api.publicKey,
                    ...data,
                },
            }).data;
        } catch (exception) {
            throw this.exception(exception.message, exception);
        }
    }

    /**
     * Create a new payment.
     *
     * @param transaction
     */
    public createPayment(transaction: PaylikeGatewayApi.payment.create.input): PaylikeGatewayApi.payment.create.response['transaction'] {
        return this.request('POST', '/transactions', transaction).transaction;
    }

    /**
     * Tokenize the given card.
     *
     * @param card
     */
    public tokenizeCard(card: PaylikeGatewayApi.card.tokenize.input): PaylikeGatewayApi.card.tokenize.response['card'] {
        return this.request('POST', '/cards', card).card;
    }
}