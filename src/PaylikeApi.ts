declare module PaylikeApi {
    type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | string

    /**
     * Current app
     *
     * @link https://api.paylike.io/me
     */
    module me {
        interface response {
            identity: {
                id: string,
                name?: string,
                created?: string,
            }
        }
    }

    /**
     * Merchants
     *
     * @link https://github.com/paylike/api-docs#merchants
     */
    module merchants {
        interface input {
            name?: string,
            test?: boolean,

            currency: CurrencyCode
            email: string,
            website: string,
            descriptor: string,
            company: {
                country: string,
                number?: string,
            },
            bank?: {
                iban?: string,
            }
        }
    }


}