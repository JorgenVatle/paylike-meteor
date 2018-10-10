import { HTTP } from 'meteor/http';
import PaylikeMerchants from "./modules/merchants";
import { PackageDetails } from "./index";
import PaylikeApps from "./modules/apps";
import PaylikeApp from "./modules/app";

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
    public exception(message: string, metadata: any) {
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
    public request(method: HttpMethod, path: string, data?: any): any {
        try {
            return HTTP.call(method, this.buildUrl(path), {
                data,
                auth: `:${this.api.key}`,
                headers: {
                    Accept: 'application/json',
                    'User-Agent': `Paylike-Meteor v${PackageDetails.version} (https://github.com/JorgenVatle/paylike-meteor)`
                },
            }).data;
        } catch (exception) {
            throw this.exception(exception.message, exception);
        }
    }

    /**
     * Fetches the current app
     */
    public get me(): PaylikeApp {
        return this.apps.me;
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
    public get apps(): PaylikeApps {
        return new PaylikeApps(this);
    }
}