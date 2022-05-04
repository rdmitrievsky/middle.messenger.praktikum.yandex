import { Block } from "../../core";
import validation from "../../utils/inputsVerefications";
import AuthController from "../../core/AuthController";

import './chatActive.scss'

export class chatActive extends Block {
    protected getStateFromProps() {
        let chats = AuthController.getChats()
        chats.then(chat => {
            const newstate = {
                inputs: [],
                currentChat: {
                    title: ''
                }
            }
            chat.forEach(element => {
                newstate.inputs.push(element)
            });
            const activeChat = chat.filter(i => {
                return i.id == window.location.search.split('=')[1]
            })
            newstate.currentChat = { ...activeChat[0] }
            this.setState(newstate)
        })
        this.state = {
            modalIsUp: false,
            values: {
                message: ''
            },
            errors: {
                message: ''
            },
            qwe: () => {
                const modal = document.querySelector('modal')
                modal?.classList.add('chatcontrolmodal_visble')
                // this.state.modalIsUp = true
                console.log(this.state.modalIsUp)
            },
            onValidate: (e: MouseEvent) => {
                const values = {
                    message: (this.refs.message as HTMLInputElement).value
                }
                const nextState = {
                    errors: {
                        message: validation('message', values.message)
                    },
                    values: { ...values },
                };

                console.log(values)
                
                this.setState(nextState)

                e.preventDefault()
            },
            singleValidate: (e: { target: HTMLInputElement }) => {
                const target = e.target
                const currentError: string = (target.nextElementSibling as HTMLBodyElement).innerText
                console.log(currentError)
                const values: Record<string, string> = {
                    message: (this.refs.message as HTMLInputElement).value
                }
                const errors = { ...this.state.errors }
                errors[target.name] = validation(target.name, values[target.name]);
                (target.nextElementSibling as HTMLBodyElement).innerText = errors[target.name]
            }
        }
    }
    render() {
        console.log(this.props)
        const { modalIsUp, values, errors } = this.state
        // language=hbs
        return `
        <div class="container container_flex container__chat">
            {{{ChatControlModal classes="${modalIsUp ? 'asdasd' : 'zxczxc'}"}}}
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
            <div class="display">
                <div class="chat-single-info">
                    <div class="user__avatar"></div>
                    <div class="user__info__name"><span>{{currentChat.title}}</span></div>
                    {{{ChatControl onClick=qwe}}}
                </div>
                <div class="chat-table">
                    {{#if currentChat.last_message}}
                        <span>asdads</span>
                    {{/if}}
                </div>
                <form>
                    <label class="login__label">
                        {{{Input onChange=singleValidate classes="login__label__input input-message-send" ref="message" name="message" type="message" value="${values.message}"}}}
                        <span class="login__label__span_error">${errors.message}</span>
                    </label>
                    {{{Button onClick=onValidate classes="button message-send" type="prime"}}}
                </form>
            </div>
        </div>
        `
    }
}