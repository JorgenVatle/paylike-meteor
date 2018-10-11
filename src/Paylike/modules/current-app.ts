import PaylikeApp from "./app";
import PaylikeCore from "../core";

export default class PaylikeCurrentApp extends PaylikeCore {

    /**
     * Current app path.
     */
    public path = '/apps';

    /**
     * Create a new app.
     *
     * @param app
     */
    public create(app: PaylikeApi.apps.create.input): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('POST', this.path, app).app
        )
    }

    /**
     * Fetch current app
     */
    public get me(): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('GET', '/me').identity
        );
    }

}