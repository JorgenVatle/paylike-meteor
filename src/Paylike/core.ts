import PaylikeService, { HttpMethod } from "./service";
import PaylikeMerchant from "./modules/merchant";
import PaylikeApp from "./modules/app";
import PaylikeUser from "./modules/user";

type DataCoreInstance = typeof PaylikeMerchant | typeof PaylikeApp | typeof PaylikeUser | any;
type DataCoreClass = PaylikeMerchant | PaylikeApp | PaylikeUser;

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
    protected request(method: HttpMethod, path: string, data?: any) {
        return this.service.request(method, path, data);
    }

    /**
     * Initialize a new Paylike module with data.
     *
     * @param paylikeModule
     * @param data
     * @param alternativeService
     */
    protected initialize(paylikeModule: DataCoreInstance, data: any, alternativeService: any = undefined): DataCoreClass {
        return new paylikeModule(alternativeService || this.service, data);
    }

    /**
     * Initialize a paginated list of Paylike entries.
     *
     * @param paylikeModule
     * @param list
     * @param alternativeService
     */
    initializeList(paylikeModule: DataCoreInstance, list: Array<any>, alternativeService: any): Array<DataCoreClass> {
        return list.map((data) => {
            return this.initialize(paylikeModule, data, alternativeService)
        });
    }
}