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
    }
}