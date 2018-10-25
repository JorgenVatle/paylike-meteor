import { HTTP } from 'meteor/http';
import PaylikeMerchants from "./modules/merchants";
import Helpers from '../helpers';
import PaylikeCurrentApp from "./modules/current-app";
import PaylikeApp from "./modules/app";
import PaylikeMerchant from "./modules/merchant";

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'OPTIONS' | 'CONNECT' | 'PATCH';

export default class PaylikeService {

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
     * @param url
     */
    public constructor(
        key: string = Helpers.settings.secret,
        url: string = Helpers.settings.serviceUrl || 'https://api.paylike.io'
    ) {
        this.api = { key, url };
    }

    /**
     * Builds a path to the Paylike API.
     *
     * @param path
     */
    protected buildUrl(path: string): string {
        return Helpers.buildUri(this.api.url, path);
    }

    /**
     * Build new exception.
     *
     * @param message
     * @param metadata
     */
    public exception(message: string, metadata?: any) {
        // @ts-ignore
        return new Meteor.Error('paylike-exception', message, {
            details: metadata && metadata.response && metadata.response.data
        });
    }

    /**
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param params
     * @returns {object}
     */
    public request(method: HttpMethod, path: string, params?: any): any {
        try {
            return HTTP.call(method, this.buildUrl(path), {
                headers: {
                    Accept: 'application/json',
                    'User-Agent': Helpers.userAgent,
                },
                auth: `:${this.api.key}`,
                params,
            }).data;
        } catch (exception) {
            throw this.exception(exception.message, exception);
        }
    }

    /**
     * Fetches the current app
     */
    public get me(): PaylikeApp {
        return this.app.me;
    }

    /**
     * Fetch the current merchant.
     */
    public get merchant(): PaylikeMerchant {
        return this.merchants.current;
    }

    /**
     * Paylike merchants class.
     */
    public get merchants(): PaylikeMerchants {
        return new PaylikeMerchants(this);
    }

    /**
     * Paylike apps class
     */
    public get app(): PaylikeCurrentApp {
        return new PaylikeCurrentApp(this);
    }
}