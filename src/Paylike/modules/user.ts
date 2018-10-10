import PaylikeMerchant from "./merchant";
import PaylikeDataCore from "../data-core";

interface UserData extends PaylikeApi.users.user {}

interface PaylikeUser extends UserData {
    entry: UserData;
}

class PaylikeUser extends PaylikeDataCore {

    /**
     * Merchant this user belongs to.
     */
    public merchant: PaylikeMerchant;

    /**
     * Paylike user constructor.
     *
     * @param merchant
     * @param user
     */
    public constructor(merchant: PaylikeMerchant, user: UserData) {
        super(merchant.service, user);
        this.merchant = merchant;
    }

    /**
     * User path URI.
     */
    public get path() {
        return this.merchant.buildPath(`/users/${this.id}`);
    }

    /**
     * Revoke a user from a merchant.
     */
    public revoke(): PaylikeApi.users.revoke.response {
        return this.request('DELETE', this.path);
    }

}

export default PaylikeUser;