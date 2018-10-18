import PaylikeCoreData from "../core-data";
import PaylikeService from "../service";
import PaylikeUsers from "./users";
import PaylikeApps from "./apps";
import PaylikeTransactions from "./transactions";
import PaylikeFraudAlerts from "./fraud-alerts";
import PaylikeCards from "./cards";

export interface PaylikeMerchantData extends PaylikeApi.merchants.merchant {}

interface PaylikeMerchant extends PaylikeMerchantData {
    entry: PaylikeMerchantData;
}

class PaylikeMerchant extends PaylikeCoreData {

    /**
     * PaylikeMerchant data.
     */
    public entry: PaylikeMerchantData;

    /**
     * Merchant service.
     */
    public service: PaylikeService;

    /**
     * Update the current merchant.
     *
     * @param params
     */
    public update(params: PaylikeApi.merchants.update.input): PaylikeMerchant {
        this.request('PUT', this.path, params);
        this.merge(this.service.merchants.find(this.id));
        return this;
    }

    /**
     * Merchant path URI.
     */
    public get path(): string {
        return `/merchants/${this.entry.id}`;
    }

    /**
     * Merchant users.
     */
    public get users(): PaylikeUsers {
        return new PaylikeUsers(this);
    }

    /**
     * Merchant cards.
     */
    public get cards(): PaylikeCards {
        return new PaylikeCards(this);
    }

    /**
     * Merchant apps.
     */
    public get apps(): PaylikeApps {
        return new PaylikeApps(this);
    }

    /**
     * Merchant transactions.
     */
    public get transactions(): PaylikeTransactions {
        return new PaylikeTransactions(this);
    }

    /**
     * Merchant fraud alerts.
     */
    public get fraudAlerts(): PaylikeFraudAlerts {
        return new PaylikeFraudAlerts(this);
    }

}

export default PaylikeMerchant;