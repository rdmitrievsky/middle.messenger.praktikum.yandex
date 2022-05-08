import Block from '../../core/Block';
import AuthController from '../../core/AuthController';

import './chatcontrolmodal.scss';

export class ChatControlModal extends Block {
    static componentName = 'ChatControlModal'
    protected getStateFromProps() {
        this.state = {
            qweqwe: '',
            testclc: () => {
                this.props.classes = ''
            },
            addUser: (e: MouseEvent) => {
                const user = (this.refs.addUserName as HTMLInputElement).value
                this.state.qweqwe = user
                const chatId = Number(this.props.chatId)
                const users = AuthController.getChatUsers(chatId)
                users.then(q => {
                    console.log(user)
                    console.log(q)
                })

                e.preventDefault()
            }
        }
    }

    protected render(): string {
        const setClasses = this.props.classes ?? `button button_${this.props.type}`
        // language=hbs
        return `
            <modal class="chatcontrolmodal ${setClasses}">
                <div class="chatcontrolmodal__container">
                    {{{Button onClick=addUser type="prime" text="zczcxzc"}}}
                    {{{Input ref="addUserName" type="text"}}}
                    {{{Button onClick=testclc type="prime" text="close"}}}
                </div>
            </modal>
        `;
    }
}