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

    /**
     * Save a card using a transaction ID.
     *
     * @param data
     */
    public save(data: PaylikeApi.cards.save.input) {
        const card = this.request('POST', this.merchant.buildPath('/cards'), data).card;
        return this.find(card.id);
    }

    // This module endpoint does not have any pagination functionality.
    // So we set the inherited pagination method types to undefined to prevent any confusion.
    public fetch: undefined;
    protected _fetch: undefined;
}