import { HTTP } from "meteor/http";
import { HttpMethod } from "../api/service";
import Helpers from "../helpers";

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
    public constructor(publicKey: string, url: string = 'https://gateway.paylike.io') {
        this.api = { publicKey, url }
    }

    /**
     * Build new exception.
     *
     * @param message
     * @param metadata
     */
    public exception(message: string, metadata: any) {
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
    public request(method: HttpMethod, path: string, data?: any): any {
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

}