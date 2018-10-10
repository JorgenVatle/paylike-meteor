declare module PaylikeApi {
    type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | string

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

        /**
         * Single merchant
         */
        module merchant {
            interface get extends merchants.create.response {}
        }
    }

    /**
     * Apps
     *
     * @link https://github.com/paylike/api-docs#apps
     */
    module apps {
        /**
         * Create an app
         */
        module create {
            interface input {
                name?: string,
            }

            interface response {
                app: {
                    id: String,
                    key: String,
                    name?: String,
                    created?: String,
                }
            }
        }

        /**
         * Fetch the current app
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
    }
}