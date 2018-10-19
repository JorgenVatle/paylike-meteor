import PaylikeUser from "./user";
import PaylikeMerchantCorePaginated from "../merchant-core-paginated";
import { PaylikeApi } from "../index";

export default class PaylikeUsers extends PaylikeMerchantCorePaginated {

    /**
     * Single user
     */
    protected singularModule = PaylikeUser;

    /**
     * Identifier to use when running `find()` calls.
     */
    protected primaryKey = 'email';

    /**
     * Paylike Merchant users path.
     */
    public get path() {
        return this.merchant.buildPath('/users');
    }

    /**
     * Invite a user.
     *
     * @param data
     */
    public invite(data: PaylikeApi.users.invite.input): PaylikeUser {
        const response = this.request('POST', this.path, data);

        return <PaylikeUser>this.initialize(
            PaylikeUser,
            {...this.find(data.email), ...response},
            this.merchant
        )
    }
}