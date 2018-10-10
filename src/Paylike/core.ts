import PaylikeService from "./service";

export default abstract class PaylikeCore {

    /**
     * Paylike service.
     */
    protected service: PaylikeService;

    /**
     * Paylike core constructor.
     *
     * @param service
     */
    constructor(service: PaylikeService) {
        this.service = service;
    }

}