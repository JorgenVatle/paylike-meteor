import Paylike from './Paylike';
import Gateway from './Paylike/gateway/gateway';

declare module 'meteor/jorgenvatle:paylike' {
    export default Paylike;
    export const PaylikeGateway: Gateway;
}