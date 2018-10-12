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

}