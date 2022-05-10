import Block from '../../core/Block';
import AuthController from '../../core/AuthController';

import './chatcontrolmodal.scss';

export class ChatControlModal extends Block {
    constructor({ ...props }) {
        super({ ...props });
    }
    static componentName = 'ChatControlModal'
    protected getStateFromProps() {
        this.state = {
            testclc: () => {
                // this.props.classes = ''
                console.log(this.element)
                this.element?.classList.remove('chatcontrolmodal_visble')
            },
            addUser: (e: MouseEvent) => {
                // e.preventDefault()
                // const user = Number((this.refs.addUserName as HTMLInputElement).value)
                // if (!user) return
                // // this.state.qweqwe = user
                // const chatId = Number(this.props.currentChatId)
                // const users = AuthController.getChatUsers(chatId)
                // users.then(chatUsers => {
                //     const qwe = chatUsers.find(usr => {
                //         return usr.id == user
                //     })
                //     if (qwe) return
                //     console.log('next')
                // //     // const newChatUsers
                // //     const names = q.map(i => i.first_name)
                // //     this.state.usersList = [...this.state.usersList, ...names]
                // const addUsersData = {
                //     "users": [0],
                //     "chatId": 0
                // }
                // addUsersData.chatId = chatId
                // addUsersData.users = [user]
                // console.log(addUsersData)
                // const newUser = AuthController.addChatUsers(addUsersData)
                // newUser.then(q => console.log(this.props))
                // })
            },
            removeUser: (e: MouseEvent) => {
                const daya = {
                    "users": [71010],
                    "chatId": 949
                }
                const target = e.target.tagName === 'SPAN' ? e.target.closest('button') : e.target
                console.log(target)
                const element = Object.keys(this.children).find(item => {
                    return this.children[item].element == target
                })

                if (confirm('asdasd') == true) {
                    AuthController.removeChatUsers(daya)
                } else {
                    console.log('MEH')
                }
            }
        }
    }
    protected render(): string {
        // language=hbs
        return `
            <modal class="chatcontrolmodal {{setvisible isVisible}}">
                <div class="chatcontrolmodal__container">
                    <div class="chatcontrolmodal__adduser">
                        <h3>Добавить пользователя:</h3>
                        <label>
                            <span>ID пользователя</span>
                            {{{Input ref="addUserName" type="number"}}}
                            {{{Button onClick=addUser type="prime" text="Добавить"}}}
                        </label>
                    </div>
                    <h3>Список пользователей:</h3>
                    <div class="chatcontrolmodal__userlist">
                        {{#each usersList}}
                            <div class="chatcontrolmodal__userlist__user">
                                {{isdefined this}}
                                {{#if (ebebebe this.id ../currentUserId ../allowToManage)}}
                                    {{{Button type="removeUser" text="Исключить" btnUserId=this.id onClick=../removeUser}}}
                                {{/if}}
                            </div>
                        {{/each}}
                    </div>
                    {{{Button onClick=testclc type="prime" text="close"}}}
                </div>
            </modal>
        `;
    }
}