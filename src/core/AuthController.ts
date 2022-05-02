import { AuthAPI, LoginData, SignupData, UserData } from '../api/AuthAPI';
import { ChatAPI, ChatsData } from '../api/ChatAPI';
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

    async getChats(): Promise<ChatsData[] | void> {
        try {
            const user = await this.apiChat.readChats();
            return user;
        } catch (e) {
            console.log(e)
        }
    }

    async editUserInfo(data: UserEditData) {
        try {
            console.log(data)
            await this.editApi.editUserInfo(data);
            await this.fetchUser();
            return true
        } catch (e) {
            console.log(e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);
            await this.fetchUser();
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async login(data: LoginData) {
        try {
            await this.api.login(data);
            await this.fetchUser();
            // console.log('data')
            // console.log(data)
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
            // console.log('user')
            // console.log(user)
            return user;
        } catch (e) {
            store.dispatch(deleteUser());
        }
    }
}

export default new AuthController();
