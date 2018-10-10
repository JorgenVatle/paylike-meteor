import PaylikeMerchant from "./merchant";
import PaylikeCore from "../core";

export default class PaylikeUsers extends PaylikeCore {

    /**
     * Paylike Merchant.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike Merchant users constructor.
     *
     * @param merchant
     */
    constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
    }

    /**
     * Invite a user.
     *
     * @param data
     */
    invite(data: PaylikeApi.users.invite.input) {
        this.request('POST', this.merchant.buildPath('/users'), data);
    }

}