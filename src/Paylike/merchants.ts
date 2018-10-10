import PaylikeService from "../../dist/Paylike/service";
import PaylikeMerchant from "./merchant";

export default class PaylikeMerchants {

    /**
     * Paylike service
     */
    protected service: PaylikeService;

    /**
     * Paylike merchants constructor
     *
     * @param service
     */
    public constructor(service: PaylikeService) {
        this.service = service;
    }

    get(merchantId: string) {
        return new PaylikeMerchant(
            this.service,
            this.service.request('GET', `/merchants/${merchantId}`),
        )
    }
}