import BaseAPI from "./BaseAPI";

export interface UserEditData {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

export class EditUser extends BaseAPI {
    constructor() {
        super('/user');
    }
    
    editUserInfo(data: UserEditData): Promise<void> {
        return this.http.put('/profile', data)
    }
}