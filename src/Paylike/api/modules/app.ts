import PaylikeCoreData from "../core-data";

interface PaylikeAppData extends PaylikeApi.apps.app {}

interface PaylikeApp extends PaylikeAppData {
    entry: PaylikeAppData;
}

class PaylikeApp extends PaylikeCoreData {}

export default PaylikeApp;