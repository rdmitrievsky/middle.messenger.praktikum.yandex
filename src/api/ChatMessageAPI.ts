import HTTPRequestClass from '../utils/GetHTTPRequest';
import { BaseAPI } from './BaseAPI';

const chatMessagesAPIInstance = new GetHTTPRequest('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}