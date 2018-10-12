import PaylikeCoreData from "../core-data";

interface PaylikeFraudAlertData extends PaylikeApi.fraud.fraud {}

interface PaylikeFraudAlert extends PaylikeFraudAlertData {
    entry: PaylikeFraudAlertData,
}

class PaylikeFraudAlert extends PaylikeCoreData {}

export default PaylikeFraudAlert;