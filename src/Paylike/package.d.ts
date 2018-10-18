import Paylike from './';
import Gateway from './gateway/gateway';

declare module 'meteor/jorgenvatle:paylike' {
    export default Paylike;
    export const PaylikeGateway: Gateway;
}