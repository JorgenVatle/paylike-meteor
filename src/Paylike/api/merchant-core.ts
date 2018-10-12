import PaylikeMerchant from "./modules/merchant";
import PaylikeCore from "./core";

export default abstract class PaylikeMerchantCore extends PaylikeCore {

    /**
     * Paylike merchant.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike Merchant Core Data constructor
     *
     * @param merchant
     */
    public constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
    }

}