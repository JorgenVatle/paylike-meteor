declare module PaylikeApi {
    type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | string

    /**
     * Current app
     *
     * @link https://api.paylike.io/me
     */
    module me {
        interface get {
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

        /**
         * Create a merchant
         */
        module create {
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

            interface response extends input {
                id: string,
                key: string,
            }
        }

        /**
         * Update a merchant
         */
        module update {
            interface input {
                name?: string,
                email?: string,
                descriptor?: string,
            }

            type response = void;
        }
    }

    /**
     * Single merchant
     *
     * @link https://github.com/paylike/api-docs#merchants
     */
    module merchant {
        interface get extends merchants.create.response {}
    }


}