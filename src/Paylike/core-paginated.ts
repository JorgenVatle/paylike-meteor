import PaylikeCore, { CoreDataInstance } from "./core";

export default abstract class PaylikeCorePaginated extends PaylikeCore {

    /**
     * Module path
     */
    protected path?: string;

    /**
     * Path specific to pagination for the current module.
     */
    protected paginationPath?: string;

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
    protected singularModule: CoreDataInstance;

    /**
     * Key to use for `find()` calls.
     */
    protected primaryKey: string = 'id';

    /**
     * Build an array of users.
     *
     * @param query
     */
    public fetch(query: PaylikeApi.PaginationQuery = { limit: 50 }) {
        return this.initializeList(
            this.singularModule,
            this.request('GET', this.paginationPath || this.path, query),
            this.alternativeService
        );
    }

    /**
     * Find an entry in the paginated list with the given key-value pair.
     *
     * @param value
     * @param key
     */
    public find(value: string, key = this.primaryKey) {
        return this.fetch().find((entry: any) => entry[key].toLowerCase() === value.toLowerCase());
    }
}