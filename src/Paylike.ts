import { HTTP } from 'meteor/http';

export default class Paylike {

    /**
     * Paylike API key
     */
    private api: {
        url: string,
        key: string,
    };

    /**
     * Paylike constructor
     *
     * @param key
     */
    public constructor(key: string) {
        this.api = {
            key,
            url: 'https://api.paylike.io'
        };
    }

    /**
     * Builds a path to the Paylike API.
     *
     * @param path
     */
    protected buildUrl(path: string): string {
        const base = (this.api.url + '/').replace(/\/+$/, '/');
        const endpoint = path.replace(/^\/+/, '');

        return base + endpoint;
    }

    /**
     * Build new exception.
     *
     * @param message
     * @param metadata
     */
    protected exception(message: string, metadata: any) {
        return new Meteor.Error('Paylike', message, metadata);
    }

    /**
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param data
     * @returns {object}
     */
    protected request(method: string, path: string, data?: any): any {
        try {
            return HTTP.call(method, this.buildUrl(path), {
                data,
                auth: `:${this.api.key}`,
                headers: { Accept: 'application/json' },
            }).data;
        } catch (exception) {
            throw this.exception(exception.message, exception);
        }
    }

    /**
     * Fetches the current app
     */
    public get me(): PaylikeApi.me.get {
        return this.request('GET', '/me');
    }

    /**
     * Merchant Resource
     */
    public merchants = {

        /**
         * Creates a new merchant
         *
         * @param merchant
         */
        create: (merchant: PaylikeApi.merchants.create.input): PaylikeApi.merchants.create.response => {
            return this.request('POST', '/merchants', merchant);
        },

        /**
         * Updates an existing merchant
         *
         * @param merchant
         */
        update: (merchant: PaylikeApi.merchants.update.input): PaylikeApi.merchants.update.response => {
            return this.request('PUT', '/merchants', merchant);
        },

        /**
         * Fetches a single merchant
         *
         * @param merchantId
         */
        get: (merchantId: string): PaylikeApi.merchants.merchant.get => {
            return this.request('GET', `/merchants/${merchantId}`);
        },
    };
}