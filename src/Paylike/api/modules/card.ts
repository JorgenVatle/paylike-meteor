import PaylikeMerchantCoreData from "../merchant-core-data";
import { PaylikeApi } from "../PaylikeApi";
import PaylikeTransaction from "./transaction";

export interface PaylikeCardData extends PaylikeApi.cards.card {}

interface PaylikeCard extends PaylikeCardData {
    entry: PaylikeCardData,
}

class PaylikeCard extends PaylikeMerchantCoreData {

    /**
     * Paylike API URI for the current card.
     */
    public get path() {
        return `/cards/${this.id}`
    }

    /**
     * Reserve funds on the current card.
     *
     * @param details
     */
    reserve(details: PaylikeApi.transactions.create.inputData): PaylikeTransaction {
        const usingCard = {...details, cardId: this.id};
        return this.merchant.transactions.create(usingCard);
    }

}

export default PaylikeCard;