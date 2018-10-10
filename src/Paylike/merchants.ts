import PaylikeMerchant from "./merchant";
import PaylikeCore from "./core";

export default class PaylikeMerchants extends PaylikeCore {

    /**
     * Fetch a merchant.
     *
     * @param merchantId
     */
    public get(merchantId: string) {
        return this.initialize(
            PaylikeMerchant,
            this.service.request('GET', `/merchants/${merchantId}`),
        )
    }

    /**
     * Create a merchant.
     *
     * @param merchant
     */
    public create(merchant: PaylikeApi.merchants.create.input): PaylikeMerchant {
        return this.initialize(
            PaylikeMerchant,
            this.service.request('POST', '/merchants', merchant)
        );
    }
}