import BaseAPI from "./BaseAPI";

export class ChatMessageAPI extends BaseAPI {
    constructor() {
        super('/chats/token');
    }
    readChats(id: number) {
        return this.http.post(`/${id}`)
    }
}