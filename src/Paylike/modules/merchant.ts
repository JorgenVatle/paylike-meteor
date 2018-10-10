import PaylikeDataCore from "../data-core";
import PaylikeService from "../service";

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
     * Merchant service.
     */
    public service: PaylikeService;

    /**
     * Update the current merchant.
     *
     * @param params
     */
    public update(params: PaylikeApi.merchants.update.input): PaylikeMerchant {
        this.request('PUT', this.path, params);
        this.merge(this.service.merchants.get(this.id));
        return this;
    }

    /**
     * Merchant path URI
     */
    public get path() {
        return `/merchants/${this.entry.id}`;
    }

    /**
     * Build a merchant path to the given location.
     *
     * @param to
     */
    public buildPath(to: string) {
        return this.path + '/' + to.replace(/^\/+/, '');
    }

}

export default PaylikeMerchant;