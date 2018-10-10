declare module PaylikeApi {
    type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | string

    /**
     * Merchants
     *
     * @link https://github.com/paylike/api-docs#merchants
     */
    module merchants {

        interface merchant extends create.input{
            id: string,
            key: string,
        }

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

            interface response {
                merchant: merchant
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
        interface identity {
            id: string,
            name?: string,
            created?: string,
        }

        interface app { key?: string }

        /**
         * Create an app
         */
        module create {
            interface input { name?: string }
            interface response { app: app }
        }

        /**
         * Fetch the current app
         */
        module me {
            interface response { identity: identity }
        }
    }

    /**
     * Users
     *
     * @link https://github.com/paylike/api-docs#merchants-users
     */
    module users {
        interface user {
            id: string,
            email: string,
            name?: string,
        }

        /**
         * Invite a user
         */
        module invite {
            interface input {
                email: string,
                name?: string,
            }

            interface response {
                user: user,
            }
        }

        /**
         * Revoke a user
         */
        module revoke {
            type response = void;
        }
    }
}