import PaylikeCoreData from "../core-data";

interface PaylikeFraudData extends PaylikeApi.fraud.fraud {}

interface PaylikeFraud extends PaylikeFraudData {
    entry: PaylikeFraudData,
}

class PaylikeFraud extends PaylikeCoreData {}

export default PaylikeFraud;