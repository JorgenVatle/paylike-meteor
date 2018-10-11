import PaylikeCorePaginated from "../core-paginated";
import PaylikeMerchant from "./merchant";

export default class PaylikeTransactions extends PaylikeCorePaginated {

    /**
     * Paylike Merchant responsible these transactions.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike Transactions constructor.
     *
     * @param merchant
     */
    public constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
    }

}