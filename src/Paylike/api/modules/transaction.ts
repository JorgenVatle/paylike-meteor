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
     * @param amount
     */
    public void(amount: number): this {
        this.request('POST', this.buildPath('/voids'), { amount });
        return this.update();
    }

}

export default PaylikeTransaction;