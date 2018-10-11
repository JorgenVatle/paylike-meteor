import PaylikeCorePaginated from "../core-paginated";
import PaylikeMerchant from "./merchant";

export default class PaylikeTransactions extends PaylikeCorePaginated {

    /**
     * Paylike Merchant responsible these transactions.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Transactions path.
     */
    protected get path() {
        return this.merchant.buildPath('/transactions');
    }

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