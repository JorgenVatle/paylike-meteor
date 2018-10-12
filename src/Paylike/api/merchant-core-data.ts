import PaylikeCoreData from "./core-data";
import PaylikeMerchant from "./modules/merchant";

export default abstract class PaylikeMerchantCoreData extends PaylikeCoreData {

    /**
     * Paylike merchant.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike Merchant Core Data constructor
     *
     * @param merchant
     * @param data
     */
    public constructor(merchant: PaylikeMerchant, data: any) {
        super(merchant.service, data);
        this.merchant = merchant;
    }

}