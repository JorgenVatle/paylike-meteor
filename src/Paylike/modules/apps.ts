import PaylikeCore from "../core";
import PaylikeApp from "./app";

export default class PaylikeApps extends PaylikeCore {

    /**
     * Create a new app.
     *
     * @param app
     */
    public create(app: PaylikeApi.apps.create.input): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('POST', '/apps', app).app
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