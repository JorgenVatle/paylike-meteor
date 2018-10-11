import PaylikeMerchant from "./merchant";
import PaylikeCorePaginated from "../core-paginated";

export default class PaylikeMerchants extends PaylikeCorePaginated {

    /**
     * Single Paylike merchant
     */
    protected singularModule = PaylikeMerchant;

    /**
     * Merchants path.
     */
    public get path() {
        return '/merchants';
    }

    /**
     * Fetch a merchant.
     *
     * @param merchantId
     */
    public get(merchantId: string): PaylikeMerchant {
        return <PaylikeMerchant>this.initialize(
            PaylikeMerchant,
            this.service.request('GET', `/merchants/${merchantId}`).merchant,
        )
    }

    /**
     * Create a merchant.
     *
     * @param merchant
     */
    public create(merchant: PaylikeApi.merchants.create.input): PaylikeMerchant {
        return <PaylikeMerchant>this.initialize(
            PaylikeMerchant,
            this.service.request('POST', '/merchants', merchant).merchant
        );
    }
}