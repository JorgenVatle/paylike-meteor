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
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param data
     * @returns {object}
     */
    protected request(method: string, path: string, data?: any): any {
        return HTTP.call(method, this.buildUrl(path), {
            data,
            headers: {
                Authorization: `:${this.api.key}`,
                Accept: 'application/json'
            },
        }).data;
    }

    /**
     * Fetches the current app
     */
    get me(): PaylikeApi.me.response {
        return this.request('GET', '/me');
    }
}