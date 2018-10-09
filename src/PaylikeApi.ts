declare module PaylikeApi {

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


}