import PaylikeMerchant from "./merchant";
import PaylikeDataCore from "../data-core";

interface UserData extends PaylikeApi.users.user {}

interface User extends UserData {
    entry: UserData;
}

class User extends PaylikeDataCore {

    /**
     * Merchant this user belongs to.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Paylike user constructor.
     *
     * @param merchant
     * @param user
     */
    constructor(merchant: PaylikeMerchant, user: UserData) {
        super(merchant.service, user);
        this.merchant = merchant;
    }

}

export default User;