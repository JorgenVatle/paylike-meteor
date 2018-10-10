import PaylikeService from "./service";
import PaylikeMerchant from "./merchant";

type PaylikeDataModule = typeof PaylikeMerchant;

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
     * @param data
     */
    protected constructor(service: PaylikeService, data?: any) {
        this.service = service;

        if (data) {
            this.merge(data)
        }
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

    /**
     * Initialize a new Paylike module with data.
     *
     * @param paylikeModule
     * @param data
     */
    protected initialize(paylikeModule: PaylikeDataModule, data: any) {
        return new paylikeModule(this.service, data);
    }
}