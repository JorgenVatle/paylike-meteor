import PaylikeDataCore from "./data-core";

interface MerchantData extends PaylikeApi.merchants.create.response {}

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
        return this.initialize(
            PaylikeMerchant,
            this.request('PUT', `/merchants/${this.entry.id}`, params).merchant
        );
    }

}

export default PaylikeMerchant;