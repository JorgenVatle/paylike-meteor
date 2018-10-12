import PaylikeMerchant from "./merchant";
import PaylikeCorePaginated from "../core-paginated";
import PaylikeApp from "./app";

export default class PaylikeMerchants extends PaylikeCorePaginated {

    /**
     * Single Paylike merchant
     */
    protected singularModule = PaylikeMerchant;

    /**
     * Merchants path.
     */
    public path = '/merchants';

    /**
     * Merchants pagination path
     */
    public get paginationPath() {
        return `/identities/${this.service.me.id}/merchants`
    }

    /**
     * Fetch a merchant.
     *
     * @param merchantId
     */
    public find(merchantId: string): PaylikeMerchant {
        return <PaylikeMerchant>
            this.findByPath(this.buildPath(merchantId), 'merchant');
    }

    /**
     * Create a merchant.
     *
     * @param merchant
     */
    public create(merchant: PaylikeApi.merchants.create.input): PaylikeMerchant {
        return <PaylikeMerchant>this.initialize(
            PaylikeMerchant,
            this.service.request('POST', this.path, merchant).merchant
        );
    }

    /**
     * Current merchant.
     */
    public get current(): PaylikeMerchant {
        const me = this.service.me;
        return <PaylikeMerchant>
            this.fetch().find((merchant: PaylikeMerchant) => {
                return !!merchant.apps.fetch().find((app: PaylikeApp) => app.id === me.id);
            });
    }
}