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
     * Send a fetch request to the pagination endpoint.
     *
     * @param query
     */
    public fetch(query: PaylikeApi.PaginationQuery = { limit: 50 }) {
        return this._fetch(query);
    }

    /**
     * Build an array of module instances from the current pagination endpoint.
     *
     * @param query
     */
    protected _fetch(query: PaylikeApi.PaginationQuery | PaylikeApi.FraudPaginationQuery) {
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

    /**
     * Fetch data for singular module by sending a request to the given path.
     *
     * @param path
     * @param responseKey
     */
    protected findByPath(path: string, responseKey: string) {
        return this.initialize(
            this.singularModule,
            this.service.request('GET', path)[responseKey],
            this.alternativeService
        )
    }
}