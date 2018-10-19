import PaylikeCoreData from "../core-data";
import { PaylikeApi } from "../index";

export interface PaylikeAppData extends PaylikeApi.apps.app {}

interface PaylikeApp extends PaylikeAppData {
    entry: PaylikeAppData;
}

class PaylikeApp extends PaylikeCoreData {}

export default PaylikeApp;