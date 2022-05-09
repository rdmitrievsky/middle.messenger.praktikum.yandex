import { AuthAPI, LoginData, SignupData, UserData } from '../api/AuthAPI';
import { ChatAPI, ChatsData, addUsers } from '../api/ChatAPI';
import { EditUser, UserEditData } from '../api/EditUser'
import { store } from '../store';
import { deleteUser, setUser, setError } from '../store/user';

class AuthController {
    private api: AuthAPI;
    private apiChat: ChatAPI;
    private editApi: EditUser

    constructor() {
        this.api = new AuthAPI()
        this.apiChat = new ChatAPI()
        this.editApi = new EditUser()
    }

    async getChatUsers(id: number) {
        try {
            const users = await this.apiChat.getChatUsers(id)
            return users
        } catch (e) {
            console.log(e)
        }
    }

    async getChats(): Promise<ChatsData[] | void> {
        try {
            const user = await this.apiChat.readChats();
            return user;
        } catch (e) {
            console.log(e)
        }
    }

    async addChatUsers(data: addUsers) {
        try {
            await this.apiChat.addUsers(data)
            return true
        } catch (e) {
            console.log(e)
        }
    }

    async createChat(data: string) {
        try {
            await this.apiChat.createChat(data);
            return true;
        } catch (e) {
            console.log(e)
        }
    }

    async editUserInfo(data: UserEditData) {
        try {
            await this.editApi.editUserInfo(data);
            await this.fetchUser();
            return true
        } catch (e) {
            console.log(e)
        }
    }

    async signup(data: SignupData) {
        try {
            console.log('qwe')
            await this.api.signup(data);
            return true
            // await this.fetchUser();
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async login(data: LoginData) {
        try {
            await this.api.login(data);
            await this.fetchUser();
        } catch (e) {
            console.log(e)
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async logout() {
        try {
            await this.api.logout();

            store.dispatch(deleteUser());
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async fetchUser(): Promise<UserData | void> {
        try {
            const user = await this.api.read();

            store.dispatch(setUser(user));
            return user;
        } catch (e) {
            store.dispatch(deleteUser());
        }
    }
}

export default new AuthController();
