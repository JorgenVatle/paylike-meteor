import PaylikeMerchant from "./merchant";
import PaylikeCore from "../core";
import PaylikeUser from "./user";

export default class PaylikeUsers extends PaylikeCore {

    /**
     * Paylike Merchant.
     */
    public merchant: PaylikeMerchant;

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
    invite(data: PaylikeApi.users.invite.input): PaylikeUser {
        return new PaylikeUser(
            this.merchant,
            this.request('POST', this.merchant.buildPath('/users'), data).user
        )
    }
}