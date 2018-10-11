import PaylikeCore from "../core";
import PaylikeApp from "./app";
import PaylikeMerchant from "./merchant";

export default class PaylikeApps extends PaylikeCore {

    /**
     * Paylike merchant
     */
    public merchant: PaylikeMerchant;

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
            this.request('POST', '/apps', app).app
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