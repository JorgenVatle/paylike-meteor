import PaylikeCoreData from "../core-data";
import PaylikeService from "../service";
import PaylikeUsers from "./users";

interface MerchantData extends PaylikeApi.merchants.merchant {}

interface PaylikeMerchant extends MerchantData {
    entry: MerchantData;
}

class PaylikeMerchant extends PaylikeCoreData {

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
    public get path(): string {
        return `/merchants/${this.entry.id}`;
    }

    /**
     * Build a merchant path to the given location.
     *
     * @param to
     */
    public buildPath(to: string): string {
        return this.path + '/' + to.replace(/^\/+/, '');
    }

    /**
     * Merchant users.
     */
    public get users(): PaylikeUsers {
        return new PaylikeUsers(this);
    }

}

export default PaylikeMerchant;