import PaylikeCoreData from "../core-data";
import PaylikeMerchant from "./merchant";

interface TransactionData extends PaylikeApi.transactions.transaction {}

interface PaylikeTransaction extends TransactionData {
    entry: TransactionData;
}

class PaylikeTransaction extends PaylikeCoreData {

    /**
     * Paylike merchant.
     */
    protected merchant: PaylikeMerchant;

    /**
     * Transaction base path.
     */
    protected get path() {
        return `/transactions/${this.id}`;
    }

    /**
     * Paylike Transaction constructor.
     *
     * @param merchant
     * @param data
     */
    public constructor(merchant: PaylikeMerchant, data: any) {
        super(merchant.service, data);
        this.merchant = merchant;
    }

    /**
     * Synchronize the current transaction with Paylike.
     */
    public update(): this {
        return this.merge(this.merchant.transactions.find(this.id).entry);
    }

    /**
     * Void the given amount from the current transaction.
     *
     * @param data
     */
    public void(data: PaylikeApi.transactions.transactionVoid.input): this {
        this.request('POST', this.buildPath('/voids'), data);
        return this.update();
    }

    /**
     * Issue a refund for the current transaction.
     *
     * @param data
     */
    public refund(data: PaylikeApi.transactions.refund.input): this {
        this.request('POST', this.buildPath('refunds'), data);
        return this.update();
    }

    /**
     * Capture a transaction.
     *
     * @param data
     */
    public capture(data: PaylikeApi.transactions.capture.input): this {
        this.request('POST', this.buildPath('/captures'), data);
        return this.update();
    }

}

export default PaylikeTransaction;