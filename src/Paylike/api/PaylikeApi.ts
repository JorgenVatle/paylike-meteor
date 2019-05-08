export module PaylikeApi {
    export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | string

    /**
     * Merchants
     *
     * @link https://github.com/paylike/api-docs#merchants
     */
    export module merchants {

        export interface merchant extends create.input{
            id: string,
            key: string,
        }

        /**
         * Create a merchant
         */
        export module create {
            export interface input {
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

            export interface response {
                merchant: merchant
            }
        }

        /**
         * Update a merchant
         */
        export module update {
            export interface input {
                name?: string,
                email?: string,
                descriptor?: string,
            }

            export type response = void;
        }

        /**
         * Single merchant
         */
        export module merchant {
            export interface get extends merchants.create.response {}
        }
    }

    /**
     * Apps
     *
     * @link https://github.com/paylike/api-docs#apps
     */
    export module apps {
        export interface identity {
            id: string,
            name?: string,
            created?: string,
        }

        export interface app extends identity { key?: string }

        /**
         * Create an app
         */
        export module create {
            export interface input { name?: string }
            export interface response { app: app }
        }

        /**
         * Fetch the current app
         */
        export module me {
            export interface response { identity: identity }
        }
    }

    /**
     * Users
     *
     * @link https://github.com/paylike/api-docs#merchants-users
     */
    export module users {
        export interface user {
            id: string,
            email: string,
            name?: string,
        }

        /**
         * Invite a user
         */
        export module invite {
            export interface input {
                email: string,
            }

            export interface response {
                isMember: boolean
            }
        }

        /**
         * Revoke a user
         */
        export module revoke {
            export type response = void;
        }
    }

    /**
     * Transactions
     *
     * @link https://github.com/paylike/api-docs#transactions
     */
    export module transactions {
        export interface card {
            bin: string,
            expiry: string,
            last4: string,
            scheme: string,
            code: {
                present: boolean,
            },
        }

        export interface trail {
            lineId: string,
            amount: number,
            balance: number,
            capture: boolean,
            created: string,
            descriptor: string,
            fee: {
                flat: number,
                rate: number,
            }
        }

        export interface transaction {
            id: string,
            amount: number,
            merchantId: string,
            capturedAmount: number,
            card: card,
            created: string,
            currency: CurrencyCode,
            custom: any,
            descriptor: string,
            disputedAmount: number,
            error: boolean,
            pendingAmount: number,
            recurring: boolean,
            refundedAmount: number,
            successful: boolean,
            tds: string,
            trail: Array<trail>
            test: boolean,
            voidedAmount: number,
        }

        /**
         * Transaction processing error
         *
         * @link https://github.com/paylike/processing-errors
         */
        export interface processingError {
            code: number,
            message: string,
            client: boolean,
            merchant: boolean,
        }

        /**
         * Create a transaction
         *
         * @link https://github.com/paylike/api-docs#create-a-transaction
         */
        export module create {
            export interface inputData {
                descriptor?: string,
                currency: string,
                amount: number,
                custom?: any,
            }

            export interface usingCard extends inputData {
                cardId: string,
            }

            export interface usingTransaction extends inputData {
                transactionId: string,
            }

            export type input = usingCard | usingTransaction;

            export interface response {
                transaction: {
                    id: string,
                }
            }
        }

        /**
         * Void a transaction
         *
         * @link https://github.com/paylike/api-docs#void-a-transaction
         */
        export module transactionVoid {
            export interface input {
                amount: number,
            }
            export type response = void;
        }

        /**
         * Refund a transaction
         *
         * @link https://github.com/paylike/api-docs#refund-a-transaction
         */
        export module refund {
            export interface input {
                amount: number,
                descriptor?: string,
            }
            export type response = void;
        }

        /**
         * Capture a transaction
         *
         * @link https://github.com/paylike/api-docs#capture-a-transaction
         */
        export module capture {
            export interface input {
                amount: number,
                currency?: CurrencyCode,
                descriptor?: string,
            }
            export type response = void;
        }
    }

    /**
     * Cards
     *
     * @link https://github.com/paylike/api-docs#cards
     */
    export module cards {

        export interface card {
            id: string,
            merchantId: string,
            created: string,
            bin: string,
            last4: string,
            expiry: string,
            scheme: string,
        }

        /**
         * Save a card
         *
         * @link https://github.com/paylike/api-docs#save-a-card
         */
        export module save {
            export interface input {
                transactionId: string,
                notes?: string,
            }
            export interface response {
                card: {
                    id: string,
                }
            }
        }

    }

    /**
     * Fraud alerts
     *
     * @link https://github.com/paylike/api-docs#fraud-alerts
     */
    export module fraud {

        export interface fraud {
            id: string,
            merchantId: string,
            transactionId: string,
            created: string,
            reported: string | undefined,
            reason: number | undefined,
        }

        export interface get {
            fraud: fraud,
        }

        export type fetch = Array<fraud>
    }

    /**
     * Query parameters for pagination requests.
     */
    export interface PaginationQuery {
        limit: string | number,
        before?: string,
        after?: string,
    }

    /**
     * Query parameters for fraud pagination requests.
     */
    export interface FraudPaginationQuery extends PaginationQuery {
        filter: {
            merchantId: string,
            transactionId?: string,
        },
    }
}
