import { Block } from "../../core";
import validation from "../../utils/inputsVerefications";

import './chatActive.scss'

export class chatActive extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                message: ''
            },
            errors: {
                message: ''
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
        const { values, errors } = this.state
        // language=hbs
        return `
        <div class="container container_flex container__chat">
            <div class="users">
                {{{Link text="Профиль" classes="users__control" href="/profile"}}}
                <label class="users__search"><input type="text" name="user-search"><span>Поиск</span></label>
                <div class="users__wrapper">
                    <a class="user" href="#">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                        </div>
                    </a>
                    <a class="user" href="#">
                        <div class="user__avatar"></div>
                        <div class="user__info">
                            <div class="user__info__name"><span>John Doe1</span></div>
                            <div class="user__info__status"><span>bebebe</span></div>
                        </div>
                        <div class="user__date">
                            <div class="user__date__time"> <span>10:49</span></div>
                            <div class="user__date__unread"> <span>3</span></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="display">
                <div class="chat-single-info">
                    <div class="user__avatar"></div>
                    <div class="user__info__name"><span>John Doe1</span></div>
                </div>
                <div class="chat-table"></div>
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