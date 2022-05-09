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
                this.props.classes = ''
            },
            // addUser: (e: MouseEvent) => {
            //     e.preventDefault()
            //     const user = (this.refs.addUserName as HTMLInputElement).value
            //     this.state.qweqwe = user
            //     const chatId = Number(this.props.chatId)
            //     const users = AuthController.getChatUsers(chatId)
            //     users.then(q => {
            //         const qwe = q.find(i => {
            //             return i.id == user 
            //         })
            //         if (qwe) {
            //             return
            //         }
            //         // const newChatUsers
            //         const names = q.map(i => i.first_name)
            //         this.state.usersList = [...this.state.usersList, ...names]
            //         // AuthController.addChatUsers()
            //     })
            // }
        }
    }
    protected render(): string {
        const setClasses = this.props.classes ?? `button button_${this.props.type}`
        // language=hbs
        return `
            <modal class="chatcontrolmodal ${setClasses}">
                <div class="chatcontrolmodal__container">
                    {{#if allowToManage}}
                        {{{Button onClick=addUser type="prime" text="zczcxzc"}}}
                        {{{Input ref="addUserName" type="text"}}}
                        {{#each usersList}}
                            <div>{{this.id}}</div>
                            <div class="qwe_{{this.role}}">qweqe</div>
                        {{/each}}
                    {{else}}
                        {{#each usersList}}
                            <div>{{this.id}}</div>
                        {{/each}}
                    {{/if}}
                    {{{Button onClick=testclc type="prime" text="close"}}}
                </div>
            </modal>
        `;
    }
}