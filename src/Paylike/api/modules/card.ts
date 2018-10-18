import PaylikeMerchantCoreData from "../merchant-core-data";

export interface PaylikeCardData extends PaylikeApi.cards.card {}

interface PaylikeCard extends PaylikeCardData {
    entry: PaylikeCardData,
}

class PaylikeCard extends PaylikeMerchantCoreData {

    public get path() {
        return `/cards/${this.id}`
    }

}

export default PaylikeCard;