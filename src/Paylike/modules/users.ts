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
        return <PaylikeUser>this.initialize(
            PaylikeUser,
            this.request('POST', this.path, data).user,
            this.merchant
        )
    }

    /**
     * Build an array of users.
     *
     * @param query
     */
    public fetch(query: PaylikeApi.PaginationQuery = { limit: 50 }) {
        return this.initializeList(
            PaylikeUser,
            this.request('GET', this.path, query),
            this.merchant
        );
    }
}