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
            {...this.fetch().find((user: PaylikeUser) => user.email === data.email), ...response},
            this.merchant
        )
    }

}