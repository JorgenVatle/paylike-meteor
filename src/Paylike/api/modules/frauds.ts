import PaylikeCorePaginated from "../core-paginated";
import PaylikeFraud from "./fraud";

export default class PaylikeFrauds extends PaylikeCorePaginated {

    /**
     * Fraud base path.
     */
    protected path = '/frauds';

    /**
     * Single fraud entry class.
     */
    protected singularModule = PaylikeFraud;

}