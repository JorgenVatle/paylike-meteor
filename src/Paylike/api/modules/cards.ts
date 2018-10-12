import PaylikeMerchantCorePaginated from "../merchant-core-paginated";
import PaylikeCard from "./card";

export default class PaylikeCards extends PaylikeMerchantCorePaginated {

    /**
     * Base path.
     */
    protected path = '/cards';

    /**
     * Single card module.
     */
    protected singularModule = PaylikeCard;

    /**
     * Fetch a single card by ID.
     *
     * @param cardId
     */
    public find(cardId: string): PaylikeCard {
        return <PaylikeCard>this.findByPath(this.buildPath(cardId), 'card');
    }

}