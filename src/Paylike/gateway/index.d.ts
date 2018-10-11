import CurrencyCode = PaylikeApi.CurrencyCode;

/**
 * Gateway transactions
 *
 * @link https://github.com/paylike/api-docs/blob/master/gateway.md#create-a-payment
 */
declare module PaylikeGatewayApi {

    interface card {
        number: number,
        core: number,
        expiry: {
            month: number,
            year: number,
        }
    }

    interface error {
        code: number,
        message: string,
        client: boolean,
        merchant: boolean,
    }

    /**
     * Gateway Payments
     */
    module payment {
        module create {
            interface input {
                currency: CurrencyCode,
                amount: number,
                card: card,
            }

            interface response {
                transaction: {
                    id: string,
                }
            }

            interface errorResponse extends error {
                response: response,
            }
        }
    }

    /**
     * Gateway cards
     */
    module card {
        module tokenize {
            type input = card;

            interface response {
                card: {
                    id: string,
                }
            }

            interface errorResponse extends error {
                response: response,
            }
        }
    }
}