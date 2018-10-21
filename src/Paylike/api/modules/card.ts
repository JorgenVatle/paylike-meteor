import PaylikeMerchantCoreData from "../merchant-core-data";
import { PaylikeApi } from "../PaylikeApi";

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
     * Add a charge to the current card.
     *
     * @param details
     */
    charge(details: PaylikeApi.transactions.create.inputData) {
        const usingCard = {...details, cardId: this.id};
        this.merchant.transactions.create(usingCard);
    }

}

export default PaylikeCard;