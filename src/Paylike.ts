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
                headers: {
                    Authorization: `:${this.api.key}`,
                    Accept: 'application/json'
                },
            }).data;
        } catch (exception) {
            throw this.exception(exception.message, exception);
        }
    }

    /**
     * Fetches the current app
     */
    get me(): PaylikeApi.me.response {
        return this.request('GET', '/me');
    }
}