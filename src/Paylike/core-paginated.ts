import PaylikeCore from "./core";
import PaylikeCoreData from "./core-data";

export interface Paginated {
    path: string,
}

export default abstract class PaylikeCorePaginated extends PaylikeCore implements Paginated {

    /**
     * Pagination path
     */
    path: string;

    /**
     * Alternative service object
     */
    alternativeService?: any;

    /**
     * Class each paginated entry should be initialized in.
     *
     * E.g. if `Merchants` extends this class, this value
     * would be `Merchant`.
     */
    singularModule: PaylikeCoreData;

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