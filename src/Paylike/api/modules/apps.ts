import PaylikeApp from "./app";
import PaylikeMerchantCorePaginated from "../merchant-core-paginated";
import { PaylikeApi } from "../index";

export default class PaylikeApps extends PaylikeMerchantCorePaginated {

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