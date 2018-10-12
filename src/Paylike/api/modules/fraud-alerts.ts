import PaylikeFraudAlert from "./fraud-alert";
import PaylikeMerchantCorePaginated from "../merchant-core-paginated";

interface FraudPaginationQuery extends PaylikeApi.PaginationQuery {
    filter?: PaylikeApi.FraudPaginationQuery['filter'];
}

export default class PaylikeFraudAlerts extends PaylikeMerchantCorePaginated {

    /**
     * Fraud base path.
     */
    protected path = '/frauds';

    /**
     * Single fraud entry class.
     */
    protected singularModule = PaylikeFraudAlert;

    /**
     * Fetch a paginated list of fraud alerts.
     *
     * @param query
     */
    public fetch(query: FraudPaginationQuery = { limit: 50 }) {
        return this._fetch({
            ...query,
            filter: {...query.filter, merchantId: this.merchant.id}
        });
    }
}