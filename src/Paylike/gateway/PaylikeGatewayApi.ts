import { PaylikeApi } from "../api/PaylikeApi";

/**
 * Gateway transactions
 *
 * @link https://github.com/paylike/api-docs/blob/master/gateway.md#create-a-payment
 */
export module PaylikeGatewayApi {

    export interface card {
        number: number,
        core: number,
        expiry: {
            month: number,
            year: number,
        }
    }

    export interface error {
        code: number,
        message: string,
        client: boolean,
        merchant: boolean,
    }

    /**
     * Gateway Payments
     */
    export module payment {
        export module create {
            import CurrencyCode = PaylikeApi.CurrencyCode;

            export interface input {
                currency: CurrencyCode,
                amount: number,
                card: card,
            }

            export interface response {
                transaction: {
                    id: string,
                }
            }

            export interface errorResponse extends error {
                response: response,
            }
        }
    }

    /**
     * Gateway cards
     */
    export module card {
        export module tokenize {
            export type input = card;

            export interface response {
                card: {
                    id: string,
                }
            }

            export interface errorResponse extends error {
                response: response,
            }
        }
    }
}