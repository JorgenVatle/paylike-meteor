import PaylikeMerchant from "./merchant";
import PaylikeCoreData from "../core-data";

interface UserData extends PaylikeApi.users.user {}

interface PaylikeUser extends UserData {
    entry: UserData;
}

class PaylikeUser extends PaylikeCoreData {

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

    /**
     * Proxy methods for revoke()
     */
    public remove = this.revoke;
    public delete = this.revoke;

}

export default PaylikeUser;