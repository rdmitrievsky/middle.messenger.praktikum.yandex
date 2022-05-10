import BaseAPI from "./BaseAPI";

export interface ChatsData {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    unread_count: number;
    last_message: null;
}
export interface addUsers {
    users: number[],
    chatId: number
}

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }
    // create() {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return chatAPIInstance.post('/', {title: 'string'});
    // }

    // request() {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return chatAPIInstance.get('/full');
    // }
    //

    readChats(): Promise<ChatsData[]> {
        return this.http.get()
    }
    createChat(data: string): Promise<string> {
        return this.http.post('/', {title: data})
    }
    getChatUsers(id: number) {
        return this.http.get(`/${id}/users`)
    }
    addUsers(data: addUsers) {
        return this.http.put(`/users`, data)
    }
    removeUser(data: addUsers) {
        return this.http.delete('/users', data)
    }
}