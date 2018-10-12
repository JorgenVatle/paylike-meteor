import PaylikeCorePaginated from "../core-paginated";
import PaylikeFraudAlert from "./fraud-alert";

export default class PaylikeFraudAlerts extends PaylikeCorePaginated {

    /**
     * Fraud base path.
     */
    protected path = '/frauds';

    /**
     * Single fraud entry class.
     */
    protected singularModule = PaylikeFraudAlert;

}