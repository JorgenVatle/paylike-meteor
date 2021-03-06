import PaylikeCorePaginated from "./core-paginated";
import PaylikeMerchant from "./modules/merchant";

export default abstract class PaylikeMerchantCorePaginated extends PaylikeCorePaginated {

    /**
     * Paylike Merchant
     */
    protected merchant: PaylikeMerchant;

    /**
     * Alternative service.
     */
    protected alternativeService: PaylikeMerchant;

    /**
     * Paylike Merchant Core Paginated constructor.
     *
     * @param merchant
     */
    constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
        this.alternativeService = this.merchant;
    }

}