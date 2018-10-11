import CurrencyCode = PaylikeApi.CurrencyCode;

declare module PaylikeGatewayApi {

    /**
     * Gateway transactions
     *
     * @link https://github.com/paylike/api-docs/blob/master/gateway.md#create-a-payment
     */
    module transactions {
        module payment {
            module create {
                interface input {
                    currency: CurrencyCode,
                    amount: number,
                    card: {
                        number: number,
                        core: number,
                        expiry: {
                            month: number,
                            year: number,
                        }
                    }
                }

                interface response {
                    transaction: {
                        id: string,
                    }
                }

                interface errorResponse {
                    code: number,
                    message: string,
                    client: boolean,
                    merchant: boolean,
                    response: {
                        transaction: {
                            id: string,
                        }
                    }
                }
            }
        }
    }
}