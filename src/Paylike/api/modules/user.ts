import PaylikeMerchantCoreData from "../merchant-core-data";
import { PaylikeApi } from "../PaylikeApi";

interface UserData extends PaylikeApi.users.user {}

interface PaylikeUser extends UserData {
    entry: UserData;
}

class PaylikeUser extends PaylikeMerchantCoreData {

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