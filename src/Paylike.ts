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
     * @param apiKey
     */
    public constructor(apiKey: string) {
        this.api.key = apiKey;
        this.api.url = 'https://api.paylike.io';
    }

    /**
     * Builds a path to the Paylike API.
     *
     * @param path
     */
    protected buildUrl(path: string): string {
        return this.api.url + path.replace(/^\/+/, '');
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
            headers: { Authorization: `:${this.api.key}` },
        }).data;
    }
}