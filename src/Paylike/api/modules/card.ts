import PaylikeMerchantCore from "../merchant-core";

interface PaylikeCardData extends PaylikeApi.cards.card {}

interface PaylikeCard extends PaylikeCardData {
    entry: PaylikeCardData,
}

class PaylikeCard extends PaylikeMerchantCore {

    public get path() {
        return `/cards/${this.id}`
    }

}

export default PaylikeCard;