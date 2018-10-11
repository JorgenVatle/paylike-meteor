export default {

    /**
     * Build a URI using the given root path to the given endpoint.
     *
     * @param base
     * @param destination
     */
    buildUri(base: string, destination: string) {
        const root = (base + '/').replace(/\/+$/, '/');
        const endpoint = destination.replace(/^\/+/, '');

        return root + endpoint;
    },

    /**
     * Current package details.
     */
    get package() {
        return eval(Assets.getText('package.js')).details;
    },

    /**
     * Package user agent.
     */
    get userAgent() {
        return `Paylike-Meteor v${this.package.version} (https://github.com/JorgenVatle/paylike-meteor)`
    }
}