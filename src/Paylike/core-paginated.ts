import PaylikeCore from "./core";
import PaylikeCoreData from "./core-data";

export default abstract class PaylikeCorePaginated extends PaylikeCore {

    /**
     * Pagination path
     */
    protected path: string;

    /**
     * Alternative service object
     */
    protected alternativeService?: any;

    /**
     * Class each paginated entry should be initialized in.
     *
     * E.g. if `Merchants` extends this class, this value
     * would be `Merchant`.
     */
    protected singularModule: PaylikeCoreData;

    /**
     * Build an array of users.
     *
     * @param query
     */
    public fetch(query: PaylikeApi.PaginationQuery = { limit: 50 }) {
        return this.initializeList(
            this.singularModule,
            this.request('GET', this.path, query),
            this.alternativeService
        );
    }
}