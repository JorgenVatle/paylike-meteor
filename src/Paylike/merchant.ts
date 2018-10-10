import PaylikeService from "./service";

interface MerchantData extends PaylikeApi.merchants.create.response {}

type MerchantOrId = MerchantData | string;

interface PaylikeMerchant extends MerchantData {
    entry: MerchantData;
}

class PaylikeMerchant {

    /**
     * Paylike Service Instance.
     */
    protected service: PaylikeService;

    /**
     * PaylikeMerchant data.
     */
    public entry: MerchantData;

    /**
     * PaylikeMerchant constructor.
     *
     * @param service
     * @param merchant
     */
    public constructor(service: PaylikeService, merchant: MerchantData) {
        this.service = service;
        this.entry = merchant;
        Object.assign(this, merchant);
    }

    /**
     * Update the current merchant.
     *
     * @param params
     */
    public update(params: PaylikeApi.merchants.update.input): PaylikeMerchant {
        return new PaylikeMerchant(
            this.service,
            this.service.request('PUT', `/merchants${this.entry.id}`, params)
        );
    }

}

export default PaylikeMerchant;