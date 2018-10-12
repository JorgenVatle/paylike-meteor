import PaylikeCorePaginated from "../core-paginated";
import PaylikeFraudAlert from "./fraud-alert";
import PaylikeMerchant from "./merchant";

export default class PaylikeFraudAlerts extends PaylikeCorePaginated {

    /**
     * Paylike Merchant
     */
    protected merchant: PaylikeMerchant;

    /**
     * Fraud base path.
     */
    protected path = '/frauds';

    /**
     * Single fraud entry class.
     */
    protected singularModule = PaylikeFraudAlert;

    /**
     * Fraud alerts constructor.
     *
     * @param merchant
     */
    constructor(merchant: PaylikeMerchant) {
        super(merchant.service);
        this.merchant = merchant;
    }

    /**
     * Fetch a paginated list of fraud alerts.
     *
     * @param query
     */
    public fetch(query: PaylikeApi.FraudPaginationQuery) {
        return this._fetch(query);
    }
}