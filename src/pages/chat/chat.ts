import { Block } from "../../core";
import AuthController from "../../core/AuthController";

import './chat.scss'

export class Chat extends Block {
    protected getStateFromProps() {
        let chats = AuthController.getChats()
        chats.then(chat => {
            const newstate = {
                inputs: []
            }
            chat.forEach(element => {
                newstate.inputs.push(element)
            });
            console.log(newstate.inputs)
            this.setState(newstate)
        })
        this.state = {
            getID: () => {
                console.log(this.state)
            }
        }
    }
    componentDidMount() {
        // let ppl = await AuthController.getChats()
    }
    render() {
        // language=hbs
        return `
        <div class="container container_flex container__chat">
            <div class="users">
                <div class="users__user-info">
                    <div>${this.props.user ? this.props.user.display_name ?? this.props.user.first_name : null}</div>
                    {{{Link text="Профиль" classes="users__control" href="/profile"}}}
                </div>
                <label class="users__search"><input type="text" name="user-search"><span>Поиск</span></label>
                <div class="users__wrapper">
                    {{#each inputs}}
                        <a class="user" href="/chat?id={{this.id}}">
                            <div class="user__avatar"></div>
                            <div class="user__info">
                                <div class="user__info__name"><span>{{this.title}}</span></div>
                                <div class="user__info__status"><span>{{this.last_message}}</span></div>
                            </div>
                            <div class="user__date">
                                <div class="user__date__time"><span>10:49</span></div>
                                <div class="user__date__unread"><span>{{this.unread_count}}</span></div>
                            </div>
                        </a>
                    {{/each}}
                </div>
            </div>
            <div class="display row"><span>Выберите чат чтобы отправить сообщение</span></div>
        </div>
        `
    }
}