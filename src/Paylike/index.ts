import PaylikeService from "./api/service";
import Gateway from "./gateway/gateway";
import { PaylikeApi } from './api/PaylikeApi';

export default PaylikeService;

export const PaylikeGateway = Gateway;

export {
    PaylikeApi,
};