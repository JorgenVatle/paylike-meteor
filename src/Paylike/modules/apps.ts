import PaylikeCore from "../core";
import PaylikeApp from "./app";

export default class PaylikeApps extends PaylikeCore {

    /**
     * Create a new app.
     *
     * @param app
     */
    create(app: PaylikeApi.apps.create.input): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('POST', '/apps', app).app
        )
    }

    /**
     * Fetch current app
     */
    get me(): PaylikeApp {
        return <PaylikeApp>this.initialize(
            PaylikeApp,
            this.request('GET', '/me').identity
        );
    }

}