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

    /**
     * Create a transaction.
     *
     * @param transaction
     */
    create(transaction: PaylikeApi.transactions.create.input): PaylikeTransaction {
        const request: PaylikeApi.transactions.create.response = this.request('POST', this.path, transaction);
        return this.find(request.transaction.id);
    }
}