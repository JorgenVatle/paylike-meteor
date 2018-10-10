import PaylikeDataCore from "./data-core";

interface MerchantData extends PaylikeApi.merchants.merchant {}

interface PaylikeMerchant extends MerchantData {
    entry: MerchantData;
}

class PaylikeMerchant extends PaylikeDataCore {

    /**
     * PaylikeMerchant data.
     */
    public entry: MerchantData;

    /**
     * Update the current merchant.
     *
     * @param params
     */
    public update(params: PaylikeApi.merchants.update.input): PaylikeMerchant {
        this.request('PUT', `/merchants/${this.entry.id}`, params);
        this.merge(this.service.merchants.get(this.id));
        return this;
    }

}

export default PaylikeMerchant;