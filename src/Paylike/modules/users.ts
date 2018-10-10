import PaylikeCore from "../core";
import PaylikeService from "../service";
import PaylikeMerchant from "./merchant";

export default class Users {

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
        this.merchant = merchant;
    }

    /**
     * Invite a user.
     *
     * @param data
     */
    invite(data: PaylikeApi.users.invite.input) {
        this.merchant.service.request('POST', this.merchant.buildPath('/users'), data);
    }

}