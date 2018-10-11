import PaylikeDataCore from "../core-data";

interface PaylikeAppData extends PaylikeApi.apps.app {}

interface PaylikeApp extends PaylikeAppData {
    entry: PaylikeAppData;
}

class PaylikeApp extends PaylikeDataCore {}

export default PaylikeApp;