import PaylikeMerchant from "./merchant";

export default class User {

    /**
     * Merchant this user belongs to.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike user constructor.
     *
     * @param merchant
     */
    constructor(merchant: PaylikeMerchant) {
        this.merchant = merchant;
    }

}