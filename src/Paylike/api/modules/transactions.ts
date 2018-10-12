import PaylikeTransaction from "./transaction";
import PaylikeMerchantCorePaginated from "../merchant-core-paginated";

export default class PaylikeTransactions extends PaylikeMerchantCorePaginated {

    /**
     * Single transaction module.
     */
    protected singularModule = PaylikeTransaction;

    /**
     * Transactions path.
     */
    protected get path() {
        return this.merchant.buildPath('/transactions');
    }

    /**
     * Fetch a transaction.
     *
     * @param transactionId
     */
    public find(transactionId: string): PaylikeTransaction {
        return <PaylikeTransaction>
            this.findByPath(`/transactions/${transactionId}`, 'transaction');
    }

}