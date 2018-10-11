import PaylikeApp from "./app";
import PaylikeMerchant from "./merchant";
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
        return this.merchant && this.merchant.buildPath('/apps');
    }

    /**
     * Paylike Apps constructor.
     *
     * @param merchant
     */
    public constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
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
}