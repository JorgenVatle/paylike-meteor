import PaylikeCore from "./core";
import PaylikeService from "./service";

export default abstract class PaylikeCoreData extends PaylikeCore {

    /**
     * Paylike data core
     *
     * @param service
     * @param data
     */
    public constructor(service: PaylikeService, data: any) {
        super(service);
        this.merge(data);
    }

    /**
     * Merge the given data with the current instance.
     *
     * @param data
     */
    protected merge(data: any): this {
        this.entry = data;
        Object.assign(this, data);
        return this;
    }
}