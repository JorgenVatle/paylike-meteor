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
     * Paylike Transaction constructor.
     *
     * @param merchant
     * @param data
     */
    public constructor(merchant: PaylikeMerchant, data: any) {
        super(merchant.service, data);
        this.merchant = merchant;
    }

}

export default PaylikeTransaction;