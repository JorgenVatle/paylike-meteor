import PaylikeCoreData from "../core-data";
import PaylikeMerchant from "./merchant";

export default class PaylikeTransaction extends PaylikeCoreData {

    /**
     * Paylike merchant.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike Transaction constructor.
     *
     * @param merchant
     * @param data
     */
    public constructor(merchant: PaylikeMerchant, data: any) {
        super(merchant.service, data);
        this.merchant = merchant;
    }

}