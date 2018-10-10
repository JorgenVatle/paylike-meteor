import PaylikeService from "./service";
import PaylikeMerchant from "./merchant";
import PaylikeApp from "./app";

type DataCoreInstance = typeof PaylikeMerchant | typeof PaylikeApp;
type DataCoreClass = PaylikeMerchant | PaylikeApp;

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
    public constructor(service: PaylikeService) {
        this.service = service;
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
    protected initialize(paylikeModule: DataCoreInstance, data: any): DataCoreClass {
        return new paylikeModule(this.service, data);
    }
}