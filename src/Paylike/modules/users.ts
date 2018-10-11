import PaylikeMerchant from "./merchant";
import PaylikeUser from "./user";
import PaylikeCorePaginated from "../core-paginated";

export default class PaylikeUsers extends PaylikeCorePaginated {

    /**
     * Paylike Merchant.
     */
    public merchant: PaylikeMerchant;

    /**
     * Single user
     */
    protected singularModule = PaylikeUser;

    /**
     * Identifier to use when running `find()` calls.
     */
    protected primaryKey = 'email';

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