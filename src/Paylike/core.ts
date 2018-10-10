import PaylikeService from "./service";

export default abstract class PaylikeCore {

    /**
     * Paylike service.
     */
    protected service: PaylikeService;

    /**
     * Raw instance data.
     */
    protected entry: any;

    /**
     * Paylike core constructor.
     *
     * @param service
     */
    protected constructor(service: PaylikeService) {
        this.service = service;
    }

    /**
     * Merge the given data with the current instance.
     *
     * @param data
     */
    protected merge(data: any) {
        this.entry = data;
        Object.assign(this, data);
    }

    /**
     * Send a request using the attached service.
     *
     * @param method
     * @param path
     * @param data
     */
    protected request(method: string, path: string, data?: any) {
        return this.service.request(method, path, data);
    }

}