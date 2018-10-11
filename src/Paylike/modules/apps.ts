import PaylikeApp from "./app";
import PaylikeMerchant from "./merchant";
import PaylikeService from "../service";
import PaylikeCorePaginated from "../core-paginated";

export default class PaylikeApps extends PaylikeCorePaginated {

    /**
     * Paylike merchant
     */
    public merchant: PaylikeMerchant;

    /**
     * Single PaylikeApp.
     */
    public get singularModule() {
        return PaylikeApp
    }

    /**
     * Paylike apps path
     */
    public get path() {
        return this.merchant && this.merchant.buildPath('/apps') || '/apps';
    }

    /**
     * Paylike Apps constructor.
     *
     * @param merchantOrService
     */
    public constructor(merchantOrService: PaylikeMerchant | PaylikeService) {
        if (merchantOrService instanceof PaylikeService) {
            super(merchantOrService);
            return;
        }

        super(merchantOrService.service);
        this.merchant = merchantOrService;
    }

    /**
     * Create a new app.
     *
     * @param app
     */
    public create(app: PaylikeApi.apps.create.input): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('POST', this.path, app).app
        )
    }

    /**
     * Fetch current app
     */
    public get me(): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('GET', '/me').identity
        );
    }

}